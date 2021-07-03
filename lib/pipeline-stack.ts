import * as codepipeline from "@aws-cdk/aws-codepipeline";
import * as codepipeline_actions from "@aws-cdk/aws-codepipeline-actions";
import * as cdk from "@aws-cdk/core";
import * as pipelines from "@aws-cdk/pipelines";

export class MainCdkPipelineStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const sourceArtifact = new codepipeline.Artifact();
    const cloudAssemblyArtifact = new codepipeline.Artifact();

    const sourceAction = new codepipeline_actions.GitHubSourceAction({
      actionName: "GitHub",
      output: sourceArtifact,
      oauthToken: cdk.SecretValue.secretsManager("GITHUB_QINJIE"),
      owner: "qinjie",
      repo: "lambda-with-cdk-pipelines",
      branch: "master",
    });

    const synthAction = pipelines.SimpleSynthAction.standardNpmSynth({
      sourceArtifact,
      cloudAssemblyArtifact,
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
  }
}