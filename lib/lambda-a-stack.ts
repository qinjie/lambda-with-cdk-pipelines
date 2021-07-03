import * as cdk from "@aws-cdk/core";
import * as lambda from "@aws-cdk/aws-lambda";
import * as lambda_python from "@aws-cdk/aws-lambda-python";
import * as path from "path";
import * as dotenv from "dotenv";

export class LambdaAlphaStack extends cdk.Stack {
  output: cdk.CfnOutput;

  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const entry_path = "../lambda/app-alpha";

    // Load .env into dictionary
    const env = dotenv.config({
      path: path.join(__dirname, entry_path, ".env"),
    });
    if (env.error) {
      throw env.error;
    }
    const env_values = {
      ...env.parsed,
    };

    const func = new lambda_python.PythonFunction(this, "FunctionAlpha", {
      entry: path.join(__dirname, entry_path),
      index: "main.py",
      handler: "handler",
      runtime: lambda.Runtime.PYTHON_3_8,
      memorySize: 256,
      timeout: cdk.Duration.seconds(10),
      environment: env_values,
    });

    this.output = new cdk.CfnOutput(this, "FunctionAlphaName", {
      value: func.functionName,
    });
  }
}
