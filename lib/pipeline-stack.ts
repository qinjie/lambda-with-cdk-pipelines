import * as codepipeline from "@aws-cdk/aws-codepipeline";
import * as codepipeline_actions from "@aws-cdk/aws-codepipeline-actions";
import * as cdk from "@aws-cdk/core";
import { Action } from "@aws-cdk/aws-codepipeline";
import * as pipelines from "@aws-cdk/pipelines";
import { LambdaStage } from "./lambda-stage";

export class PipelineStack extends cdk.Stack {
  repo_owner: string = process.env.REPO_OWNER!;
  repo_name: string = process.env.REPO_NAME!;
  repo_branch: string = process.env.REPO_BRANCH!;
  secrets_manager_var: string = process.env.SECRETS_MANAGER_VAR!;

  private getSourceAction(sourceArtifact: codepipeline.Artifact): Action {
    const sourceActionProps = {
      actionName: "GitHub",
      output: sourceArtifact,
      oauthToken: cdk.SecretValue.secretsManager(this.secrets_manager_var),
      owner: this.repo_owner,
      repo: this.repo_name,
      branch: this.repo_branch,
    };

    return new codepipeline_actions.GitHubSourceAction(sourceActionProps);
  }

  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const sourceArtifact = new codepipeline.Artifact();
    const cloudAssemblyArtifact = new codepipeline.Artifact();

    const sourceAction = this.getSourceAction(sourceArtifact);

    const synthAction = pipelines.SimpleSynthAction.standardNpmSynth({
      sourceArtifact,
      cloudAssemblyArtifact,
      installCommand: "npm install --include=dev",
      buildCommand: "npm run build",
      environment: {
        privileged: true,
      },
    });

    const pipeline = new pipelines.CdkPipeline(this, "Pipeline", {
      // Disable Customer Master Keys for same account deployment
      crossAccountKeys: false,
      // Other setups
      pipelineName: id,
      cloudAssemblyArtifact,
      sourceAction,
      synthAction,
      /* Diable mutating when developing pipeline only */
      // selfMutating: false,
    });

    // Add one or more application stage
    const stageDev = pipeline.addStage("dev");

    const lambdaStage = new LambdaStage(this, "LambdaStage");
    stageDev.addApplication(lambdaStage);
  }
}
