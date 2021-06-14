const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();
exports.handler = async (event) => {
  //const bucket = event.Records[0].s3.bucket.name;
  const mid = event.Records[0].Sns.MessageId;
  const message = JSON.parse(event.Records[0].Sns.Message);
  const eventtime = event.Records[0].Sns.Timestamp;
  const bucket = message.Records[0].s3.bucket.name;
  const key = decodeURIComponent(
    message.Records[0].s3.object.key.replace(/\+/g, " ")
  );
  const params = {
  TableName : 'lambdatest',
  /* Item properties will depend on your application concerns */
  Item: {
     mid: mid,
    eventtime: eventtime,
    bucketname: bucket,
    filename: key
  }
}
  try {
    await  docClient.put(params).promise();
    return { body: 'Successfully created item!' }
  } catch (err) {
    return { error: err }
  }
};
