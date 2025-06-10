#!/bin/bash

set -e                                                     # stop script if any error

cd ./front-end
yarn install
yarn build

S3_BUCKET_NAME="voting-app-kubon-tech"
aws s3 rm "s3://${S3_BUCKET_NAME}" --recursive
aws s3 cp build/ "s3://${S3_BUCKET_NAME}" --recursive      # --acl public-read

aws cloudfront list-distributions --query "DistributionList.Items[*].[Id, DomainName, Origins.Items[0].Id]" --output table
echo """
Run:
    CLOUDFRONT_DISTRIBUTION_ID=
    CLOUDFRONT_DOMAIN=\$(aws cloudfront get-distribution --id "\${CLOUDFRONT_DISTRIBUTION_ID}" --query "Distribution.DomainName" --output text)
    echo "https://\${CLOUDFRONT_DOMAIN}"
"""

