#!/bin/bash
# School MS Pro Packaging Script
# Packages the plugin as school-ms-pro.zip with only real code/assets (no dummy/sample data)
# Ensures the ZIP is between 20MB and 30MB

set -e

PLUGIN_DIR="$(dirname "$0")"
ZIP_NAME="school-ms-pro.zip"
TMP_DIR="/tmp/school-ms-pro-build-$$"

# Clean up any previous build
rm -rf "$TMP_DIR"
mkdir "$TMP_DIR"

# Copy plugin files, excluding unwanted files and folders
rsync -av --exclude='.git' \
          --exclude='node_modules' \
          --exclude='*.log' \
          --exclude='*.DS_Store' \
          --exclude='sample-students.csv' \
          --exclude='school-ms-pro.zip' \
          --exclude='build-package.sh' \
          "$PLUGIN_DIR"/ "$TMP_DIR"/

# Remove any other sample/demo/test data if present
find "$TMP_DIR" -type f -name '*sample*' -delete
find "$TMP_DIR" -type f -name '*demo*' -delete
find "$TMP_DIR" -type f -name '*test*' -delete

# Create the ZIP
cd "$TMP_DIR"
zip -r "$PLUGIN_DIR/$ZIP_NAME" ./*

# Check ZIP size
ZIP_SIZE=$(stat -c%s "$PLUGIN_DIR/$ZIP_NAME")
ZIP_SIZE_MB=$((ZIP_SIZE / 1024 / 1024))

if [ "$ZIP_SIZE_MB" -lt 20 ]; then
  echo "[ERROR] school-ms-pro.zip is too small: ${ZIP_SIZE_MB}MB. Add more real code/assets."
  exit 1
elif [ "$ZIP_SIZE_MB" -gt 30 ]; then
  echo "[ERROR] school-ms-pro.zip is too large: ${ZIP_SIZE_MB}MB. Remove unnecessary files."
  exit 1
else
  echo "[SUCCESS] school-ms-pro.zip created: ${ZIP_SIZE_MB}MB."
fi

# Clean up
rm -rf "$TMP_DIR"
