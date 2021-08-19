import * as cdk from "@aws-cdk/core";
import { CfnOutput } from "@aws-cdk/core";
import { LambdaAlphaStack } from "./lambda-a-stack";
import { LambdaBetaStack } from "./lambda-b-stack";
import { IFunction } from "@aws-cdk/aws-lambda";

export class LambdaStage extends cdk.Stage {
  outputAlpha: CfnOutput;
  funcAlpha: IFunction;
  outputBeta: CfnOutput;
  funcBeta: IFunction;

  constructor(scope: cdk.Construct, id: string, props?: cdk.StageProps) {
    super(scope, id, props);

    const stackAlpha = new LambdaAlphaStack(this, "LambdaAlpha", {
      tags: {
        Application: "LambdaAlpha",
        Environment: id,
      },
    });
    this.funcAlpha = stackAlpha.lambdaFunction;
    this.outputAlpha = stackAlpha.output;

    const stackBeta = new LambdaBetaStack(this, "LambdaBeta", {
      tags: {
        Application: "LambdaBeta",
        Environment: id,
      },
    });
    this.funcBeta = stackBeta.lambdaFunction;
    this.outputBeta = stackBeta.output;
  }
}
