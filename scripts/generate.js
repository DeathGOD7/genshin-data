const fs = require('fs');
const path = require('path');

const GENERATED_PATH = path.join(__dirname, '..', 'src', 'data');

const languages = [
  'english',
  'japanese',
  'spanish',
  'chinese-simplified',
  'chinese-traditional',
  'french',
  'german',
  'indonesian',
  'korean',
  'portuguese',
  'russian',
  'thai',
  'vietnamese',
];
const folders = [
  'artifacts',
  'characters',
  'common_materials',
  'elemental_stone_materials',
  'food',
  'ingredients',
  'jewels_materials',
  'local_materials',
  'potions',
  'talent_lvl_up_materials',
  'weapon_primary_materials',
  'weapon_secondary_materials',
  'weapons',
];

function combineData() {
  for (const lang of languages) {
    let data = {};
    for (const folder of folders) {
      if (!fs.existsSync(`${GENERATED_PATH}/${lang}/${folder}`)) continue;
      data[folder] = [];

      fs.readdirSync(`${GENERATED_PATH}/${lang}/${folder}`).forEach(
        filename => {
          if (!filename.endsWith('.json')) return;
          console.log(`${GENERATED_PATH}/${lang}/${folder}/${filename}`);
          data[folder].push(
            require(`${GENERATED_PATH}/${lang}/${folder}/${filename}`)
          );
        }
      );
    }

    fs.writeFileSync(`./src/min/data_${lang}.min.json`, JSON.stringify(data));
  }
}

combineData();
