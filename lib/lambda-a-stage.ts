import * as cdk from "@aws-cdk/core";
import { CfnOutput } from "@aws-cdk/core";
import { LambdaAlphaStack } from "./lambda-a-stack";

export class LambdaAlphaStage extends cdk.Stage {
  output: CfnOutput;

  constructor(scope: cdk.Construct, id: string, props?: cdk.StageProps) {
    super(scope, id, props);

    const service = new LambdaAlphaStack(this, "StageAlpha", {
      tags: {
        Application: "StageAlpha",
        Environment: id,
      },
    });

    this.output = service.output;
  }
}
