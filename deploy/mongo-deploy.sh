#!/usr/bin/env bash

helm install --name my-release --namespace headless-k \
  --set mongodbRootPassword=${rootPass},mongodbUsername=${iuser},mongodbPassword=${userPass},mongodbDatabase=server,persistence.existingClaim=mongo-volume-claim \
    stable/mongodb
