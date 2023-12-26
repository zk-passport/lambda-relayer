To update lambda function, run:
```
zip -r lambda.zip .
aws lambda update-function-code --function-name mintNFT --zip-file fileb://lambda.zip
```