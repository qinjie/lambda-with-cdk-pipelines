import * as cdk from "@aws-cdk/core";
import { CfnOutput } from "@aws-cdk/core";
import { LambdaAlphaStack } from "./lambda-a-stack";
import { IFunction } from "@aws-cdk/aws-lambda";

export class LambdaAlphaStage extends cdk.Stage {
  output: CfnOutput;
  func: IFunction;

  constructor(scope: cdk.Construct, id: string, props?: cdk.StageProps) {
    super(scope, id, props);

    const stack = new LambdaAlphaStack(this, "LambdaAlpha", {
      tags: {
        Application: "LambdaAlpha",
        Environment: id,
      },
    });
    this.func = stack.lambdaFunction;
    this.output = stack.output;
  }
}
