#!/bin/bash

source sh/var/text_formatting.sh

directory_name=$1

# Read the existing JSON content from the file
wp_env_config=$(cat .wp-env.json)

key="wp-content/themes/${directory_name}"

value="./wp/themes/${directory_name}"

updated_config=$(echo "$wp_env_config" | jq --arg key "$key" --arg value "$value" '.mappings += { ($key): $value }')

echo "$updated_config" > .wp-env.json

echo -e "${GREEN}New theme added to wp-env mappings.${RESET}"