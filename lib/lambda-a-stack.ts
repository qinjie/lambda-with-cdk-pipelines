import * as cdk from "@aws-cdk/core";
import * as lambda from "@aws-cdk/aws-lambda";
import * as lambda_python from "@aws-cdk/aws-lambda-python";
import * as path from "path";
import * as dotenv from "dotenv";
import { Construct } from "@aws-cdk/core";
import { IFunction } from "@aws-cdk/aws-lambda";

export class LambdaAlphaStack extends cdk.Stack {
  output: cdk.CfnOutput;
  lambdaFunction: IFunction;

  // Update Lambda Function Definition here
  /* TO BE UPDATED - START */
  lambda_src_folder = "../src/lambda-alpha";
  name: string;

  private getLambdaFunction(
    scope: Construct,
    env_values: { [key: string]: string } | undefined
  ): IFunction {
    const props = {
      entry: path.join(__dirname, this.lambda_src_folder),
      index: "main.py",
      handler: "handler",
      runtime: lambda.Runtime.PYTHON_3_8,
      memorySize: 256,
      timeout: cdk.Duration.seconds(10),
      environment: env_values,
    };

    const f = new lambda_python.PythonFunction(scope, this.name, props);
    return f;
  }
  /* TO BE UPDATED - END */

  // Load .env into dictionary for lambda function
  private loadEnv() {
    const env = dotenv.config({
      path: path.join(__dirname, this.lambda_src_folder, ".env"),
    });
    if (env.error) {
      throw env.error;
    }
    const env_values = {
      ...env.parsed,
    };
    return env_values;
  }

  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const env_values = this.loadEnv();
    this.name = id;
    this.lambdaFunction = this.getLambdaFunction(this, env_values);
    this.output = new cdk.CfnOutput(this, `${this.name}_FunctionName`, {
      value: this.lambdaFunction.functionName,
    });
  }
}
