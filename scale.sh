#!/usr/bin/env bash

for i in {1..2000}
do
  echo $i
  okteto preview deploy --branch test --repository https://github.com/okteto/movies
  sleep 1
done

# k delete ns -l preview.okteto.com/scope=personal