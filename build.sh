#!/bin/bash

# Assuming the labs directory is in the same directory as this script
labs_dir="./labs"
output_dir="public"

# Check if the labs directory exists
if [ ! -d "$labs_dir" ]; then
  echo "Error: The labs directory doesn't exist."
  exit 1
fi

# Create the output directory if it doesn't exist
mkdir -p "$output_dir"

# Loop through each folder in the labs directory
for folder in "$labs_dir"/*; do
  # Check if it's a directory and not the example folder
  if [ -d "$folder" ] && [ "$(basename "$folder")" != "example" ]; then
    codelab_md="$folder/codelab.md"

    # Check if codelab.md exists in the folder
    if [ -f "$codelab_md" ]; then
      # Run claat on codelab.md and output to dist/ in the folder
      claat export -o "$output_dir" "$codelab_md"
    else
      echo "Warning: codelab.md not found in $folder"
    fi
  fi
done
