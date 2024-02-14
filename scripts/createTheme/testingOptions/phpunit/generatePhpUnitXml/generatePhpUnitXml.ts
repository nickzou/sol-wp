import { File } from "@utils/types/File"

type GeneratePhpUnitXml = {
    themeName: string;
}

const generatePhpUnitXml = ({themeName}:GeneratePhpUnitXml):File => {
    const content = `<?xml version="1.0"?>
<phpunit xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" bootstrap="vendor/autoload.php" colors="true" xsi:noNamespaceSchemaLocation="https://schema.phpunit.de/11.1/phpunit.xsd" cacheDirectory=".phpunit.cache">
  <testsuites>
    <testsuite name="${themeName} Theme Tests">
      <directory>tests</directory>
    </testsuite>
  </testsuites>
  <source>
    <include>
      <directory suffix=".php">functions</directory>
    </include>
  </source>
</phpunit>`;

    return {
        name: 'phpunit.xml',
        content
    }
};

export default generatePhpUnitXml;

