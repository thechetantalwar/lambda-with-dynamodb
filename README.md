## Use Case
* ![Use Case Diagram](https://github.com/thechetantalwar/lambda-with-dynamodb/blob/master/diagram.jpeg?raw=true)
## Instructions to implement
* Create a S3 bucket with the help of AWS CLI, put your bucket name in the command (it should be globally unique)
    * aws s3 mb s3://your_bucket_name
* Creating SNS Topic
    * aws sns create-topic demo-topic
* Create Dynamo DB table
    aws dynamodb create-table --table-name lambdatest --attribute-definitions AttributeName=mid,AttributeType=S --key-schema AttributeName=mid,KeyType=HASH --billing-mode PAY_PER_REQUEST
* Now we have most of the required resources created, it's time to link them all together and create our Lambda Function.
* Creating Lambda Function using AWS Management Console
    * Go to AWS Managment Console
    * Browse to Lambda Service Page
    * Create a Lambda Function stating any name with Runtime NodeJs
    * Replace the exisitng code in 'index.js' with the one in [this file](https://github.com/thechetantalwar/lambda-with-dynamodb/blob/master/index.js)
    * In the code, just update your DynamoDB table name, if you are using something different
* Adding Lambda Function as Subscriber for your SNS Topic
    * Go to your SNS Topic Page
    * Click on Create Subscription
    * Choose portocol as Lambda
    * Choose Endpoint as your Lambda Function which you created in one of the above step
    * Click on Create Subscription
* Now, Let's update the access polciy of your SNS Topic, so that, it do have rights to interact with your S3 Bucket.
    * Go to your SNS Topic Page
    * Click on Edit Button
    * Click on Access Policy to expand it
    * Replace the json data with the one in [this file](https://github.com/thechetantalwar/lambda-with-dynamodb/blob/master/policy.json)
    * Before saving the Policy changes, just update few values stating "Your_AWS_Account_Id","YOUR_S3_Bucket_ARN","Your_SNS_Topic_ARN" values in the code
    * You can get the Account id by clicking your User name in the Management Console
    * Your S3 bucket ARN will be "arn:aws:s3:::YOUR_BUCKET_NAME"
    * To get the ARN of your SNS topic, go to Topic Page, there under details you will see the same
    * After updating the values, Save the changes
* Let's add event notification in your S3 bucket, where on any put operation in the bucket it will send a notification to your SNS topic.
    * Go to S3 Dashboard
    * Click on your bucket name to go to the specific page
    * Click on properties
    * Scroll down to the Event Notifications
    * Click on Create Event Notification
    * Provide some name for Event
    * Under Event Types, just select "All object create events"
    * Under Destination, select SNS
    * Now, choose your Lambda Function from the Drop Down
    * Save Changes
* Now everything is set, we have bucket created, which will send notification to SNS, which will further trigger your Lambda Function to add the record in DynamoDB. But still there is one part which is missing, our Lambda Function do not have required privileges to update the Dynamo DB.
* Let's attach the policy to the Role associated to our Lambda Function
    * Go to your Lambda Function page
    * Go to Configuration then Permissions
    * Now click on the Role Name, it will take to you the IAM Roles Page
    * Click on Attach Policy
    * Let's provide full access to DynamoDB
    * Filter the policies out for "AmazonDynamoDBFullAccess", and select this
    * Click on Attach Policy to get it updated
* Our Playground is set, let's see it in action
    * Go to your S3 Bucket page
    * Upload some file over there
    * Now, in the background everything took place, so to verify it let's go to Dynamo DB page
    * Go to Tables, then click on your table name
    * Click on Items
    * You should see a record in the table for the file you uploaded a while ago

* That's it, we have succefully completed the excercise. Happy Learning!!!
