import * as cdk from "@aws-cdk/core";
import { CfnOutput } from "@aws-cdk/core";
import { LambdaBetaStack } from "./lambda-b-stack";
import { IFunction } from "@aws-cdk/aws-lambda";

export class LambdaBetaStage extends cdk.Stage {
  output: CfnOutput;
  func: IFunction;

  constructor(scope: cdk.Construct, id: string, props?: cdk.StageProps) {
    super(scope, id, props);

    const stack = new LambdaBetaStack(this, "LambdaBeta", {
      tags: {
        Application: "LambdaBeta",
        Environment: id,
      },
    });
    this.func = stack.lambdaFunction;
    this.output = stack.output;
  }
}
