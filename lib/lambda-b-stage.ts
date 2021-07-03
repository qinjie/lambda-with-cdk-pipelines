import * as cdk from "@aws-cdk/core";
import { CfnOutput } from "@aws-cdk/core";
import { LambdaBetaStack } from "./lambda-b-stack";

export class LambdaBetaStage extends cdk.Stage {
  output: CfnOutput;

  constructor(scope: cdk.Construct, id: string, props?: cdk.StageProps) {
    super(scope, id, props);

    const service = new LambdaBetaStack(this, "StageBeta", {
      tags: {
        Application: "StageBeta",
        Environment: id,
      },
    });

    this.output = service.output;
  }
}
