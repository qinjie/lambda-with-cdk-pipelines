# Lambda CD with CDK Pipelines

This project uses AWS CDK Pipelines to create pipelines and deploy multiple lambda functions.

After project is deployed in AWS, a new commits in GitHub repo's master branch will trigger AWS codepipeline to self-mutate pipeline and deploy lambda function. 

This project illustrates deployment of 2 lambda functions. Environment variables defined in `.env` file for each lambda is added to respective lambda function too. 

