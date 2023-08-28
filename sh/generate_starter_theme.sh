#!/bin/bash

source sh/var/text_formatting.sh

#THEME NAME
echo -e "${BOLD}Enter a name for your theme:${RESET}"

read theme_name

if [ -z $theme_name ]
  then
  echo -e "${YELLOW}You didn't enter a name, creating a default theme with the name Sol WP. ${RESET}"
  theme_name="Sol WP"
fi

#THEME CSS
echo -e "${BOLD}Enter theme folder name (leave blank and we'll generate one based off your theme name):${RESET}"

while true; do
    read directory_name

    if [[ "$directory_name" == *" "* ]]; then
        echo "${YELLOW}Folder name can't contain spaces. Please try again.{$RESET}"
    else
        if [ -z $directory_name ]
          then
          directory_name=$(echo "$theme_name" | tr '[:upper:]' '[:lower:]' | tr ' ' '-')
        fi
        break  # Exit the loop when valid input is provided
    fi
done

#THEME DESCIPTION
echo -e "${BOLD}Provide a description (optional): ${RESET}"

read description

if [ -z $description ]
  then
  description='A basic theme for Sol WP development toolchain.'
fi

#THEME AUTHOR
echo -e "${BOLD}Provide an author (optional): ${RESET}"

read author

if [ -z $author ]
  then
  author='Theme Author'
fi

#THEME VERSION
echo -e "${BOLD}Provide a version (optional): ${RESET}"

read version

if [ -z $version ]
  then
  author='1.0.0'
fi

./sh/starter_theme/create_folder.sh "$directory_name"
./sh/starter_theme/create_css.sh "$theme_name" "$description" "$author" "$version" "$directory_name"
./sh/starter_theme/create_php.sh "$directory_name"
./sh/starter_theme/wp_env_setup.sh "$directory_name"


echo -e "${GREEN}${BOLD}${theme_name} successfully created ${RESET}"