#!/usr/bin/env bash
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd $SCRIPT_DIR

#Create symlink for tests.
cd  ./../../../tests/integration/
ln -s ./../../lib/ember-c-form/tests/integration/components ember-c-form
