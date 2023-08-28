#!/bin/bash

source sh/var/text_formatting.sh

directory_name=$1

mkdir "wp/themes/$directory_name"
echo -e "${GREEN}theme folder created.${RESET}"