#!/bin/bash

source sh/var/text_formatting.sh

theme_name=$1
description=$2
author=$3
version=$4
directory_name=$5

# Define the content for style.css
css_content="/*
Theme Name: ${theme_name}
Description: ${description}
Author: ${author}
Version: ${version}
*/"

# Create the style.css file and write the content
echo -e "$css_content" > wp/themes/${directory_name}/style.css

echo -e "${GREEN}style.css generated successfully.${RESET}"