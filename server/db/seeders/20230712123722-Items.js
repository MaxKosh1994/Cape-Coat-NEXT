/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Items',
      [
        // TODO поменять article, new_price, bestseller, material_id
        {
          article: '0001',
          name: 'Двубортный тренч',
          description: 'Двубортный тренч из хлопка с одним рядом пуговиц',
          model_params: 'Длина изделия 125 см. Рост модели 174 см',
          characteristics:
            'Водоотталкивающий, двубортный, пояс на талии, детали из сатиновой отделки.',
          price: 13500,
          new_price: 0,
          in_stock: false,
          bestseller: false,
          collection_id: 1,
          material_id: 1,
          category_id: 1,
        },

        {
          article: '0001',
          name: 'Двубортный тренч',
          description: 'Двубортный тренч из хлопка с одним рядом пуговиц',
          model_params: 'Длина изделия 125 см. Рост модели 174 см',
          characteristics:
            'Водоотталкивающий, двубортный, пояс на талии, детали из сатиновой отделки.',
          price: 10500,
          new_price: 2500,
          in_stock: true,
          bestseller: true,
          collection_id: 1,
          material_id: 1,
          category_id: 1,
        },

        {
          article: '0001',
          name: 'Объемный тренч',
          description: 'Самая объёмная модель тренча в нашей линейке',
          model_params: 'Длина изделия 135 см. Рост модели 174 см.',
          characteristics:
            'Водоотталкивающий, двубортный, пояс на талии, детали из сатиновой отделки.',
          price: 13500,
          new_price: 0,
          in_stock: false,
          bestseller: false,
          collection_id: 1,
          material_id: 2,
          category_id: 1,
        },

        {
          article: '0001',
          name: 'Объемный тренч',
          description: 'Самая объёмная модель тренча в нашей линейке',
          model_params: 'Длина изделия 135 см. Рост модели 174 см.',
          characteristics:
            'Водоотталкивающий, двубортный, пояс на талии, детали из сатиновой отделки.',
          price: 10500,
          new_price: 7500,
          in_stock: true,
          bestseller: true,
          collection_id: 1,
          material_id: 2,
          category_id: 1,
        },

        {
          article: '0001',
          name: 'Среднеобъёмный тренч',
          description: 'Тренч из хлопка среднего объема с манжетами на рукавах',
          model_params: 'Длина изделия 125 см. Рост модели 174 см.',
          characteristics:
            'Водоотталкивающий, двубортный, пояс на талии, детали из сатиновой отделки.',
          price: 13500,
          new_price: 0,
          in_stock: false,
          bestseller: true,
          collection_id: 1,
          material_id: 3,
          category_id: 1,
        },

        {
          article: '0001',
          name: 'Среднеобъёмный тренч',
          description: 'Тренч из хлопка среднего объема с манжетами на рукавах',
          model_params: 'Длина изделия 125 см. Рост модели 174 см.',
          characteristics:
            'Водоотталкивающий, двубортный, пояс на талии, детали из сатиновой отделки.',
          price: 10500,
          new_price: 2500,
          in_stock: true,
          bestseller: false,
          collection_id: 1,
          material_id: 3,
          category_id: 1,
        },

        {
          article: '0001',
          name: 'Тренч прямого кроя',
          description: 'Тренч из хлопка прямого кроя с воротником-стойкой',
          model_params: 'Длина изделия 122 см. Рост модели 168 см',
          characteristics:
            'Водоотталкивающий, двубортный, пояс на талии, детали из сатиновой отделки.',
          price: 13500,
          new_price: 0,
          in_stock: false,
          bestseller: false,
          collection_id: 1,
          material_id: 3,
          category_id: 1,
        },

        {
          article: '0001',
          name: 'Тренч прямого кроя',
          description: 'Тренч из хлопка прямого кроя с воротником-стойкой',
          model_params: 'Длина изделия 122 см. Рост модели 168 см',
          characteristics:
            'Водоотталкивающий, двубортный, пояс на талии, детали из сатиновой отделки.',
          price: 10500,
          new_price: 2500,
          in_stock: true,
          bestseller: false,
          collection_id: 1,
          material_id: 4,
          category_id: 1,
        },

        {
          article: '0001',
          name: 'Классический тренч',
          description: 'Тренч из хлопка классического кроя',
          model_params: 'Длина изделия 122 см. Рост модели 174 см.',
          characteristics:
            'Водоотталкивающий, двубортный, пояс на талии, детали из сатиновой отделки.',
          price: 13500,
          new_price: 0,
          in_stock: false,
          bestseller: true,
          collection_id: 1,
          material_id: 4,
          category_id: 1,
        },

        {
          article: '0001',
          name: 'Классический тренч',
          description: 'Тренч из хлопка классического кроя',
          model_params: 'Длина изделия 122 см. Рост модели 174 см.',
          characteristics:
            'Водоотталкивающий, двубортный, пояс на талии, детали из сатиновой отделки.',
          price: 10500,
          new_price: 5500,
          in_stock: true,
          bestseller: true,
          collection_id: 1,
          material_id: 4,
          category_id: 1,
        },

        {
          article: '0001',
          name: 'Кожаный тренч',
          description: 'Тренч из эко-кожи прямого кроя',
          model_params: 'Длина изделия 126 см. Рост модели 174 см.',
          characteristics:
            'Водоотталкивающий, двубортный, пояс на талии, детали из сатиновой отделки.',
          price: 13500,
          new_price: 0,
          in_stock: false,
          bestseller: true,
          collection_id: 1,
          material_id: 4,
          category_id: 1,
        },

        {
          article: '0001',
          name: 'Кожаный тренч',
          description: 'Тренч из эко-кожи прямого кроя',
          model_params: 'Длина изделия 126 см. Рост модели 174 см.',
          characteristics:
            'Водоотталкивающий, двубортный, пояс на талии, детали из сатиновой отделки.',
          price: 10500,
          new_price: 10100,
          in_stock: true,
          bestseller: false,
          collection_id: 1,
          material_id: 4,
          category_id: 1,
        },

        {
          article: '0001',
          name: 'Кожаный тренч',
          description: 'Тренч из эко-кожи с манжетами',
          model_params: 'Длина изделия 126 см. Рост модели 174 см.',
          characteristics:
            'Водоотталкивающий, двубортный, пояс на талии, детали из сатиновой отделки.',
          price: 13500,
          new_price: 0,
          in_stock: false,
          bestseller: false,
          collection_id: 1,
          material_id: 1,
          category_id: 1,
        },

        {
          article: '0001',
          name: 'Кожаный тренч',
          description: 'Тренч из эко-кожи с манжетами',
          model_params: 'Длина изделия 126 см. Рост модели 174 см.',
          characteristics:
            'Водоотталкивающий, двубортный, пояс на талии, детали из сатиновой отделки.',
          price: 10500,
          new_price: 2500,
          in_stock: true,
          bestseller: false,
          collection_id: 1,
          material_id: 1,
          category_id: 1,
        },

        {
          article: '0001',
          name: 'Двубортное пальто',
          description:
            'Двубортное пальто объемного кроя со спущенным плечом и декоративными погонами',
          model_params: 'Длина изделия 125 см. Рост модели 177 см',
          characteristics:
            'Водоотталкивающий, двубортный, пояс на талии, детали из сатиновой отделки.',
          price: 16500,
          new_price: 0,
          in_stock: false,
          bestseller: true,
          collection_id: 1,
          material_id: 5,
          category_id: 2,
        },

        {
          article: '0001',
          name: 'Двубортное пальто',
          description:
            'Двубортное пальто объемного кроя со спущенным плечом и декоративными погонами',
          model_params: 'Длина изделия 125 см. Рост модели 177 см',
          characteristics:
            'Водоотталкивающий, двубортный, пояс на талии, детали из сатиновой отделки.',
          price: 13500,
          new_price: 2500,
          in_stock: true,
          bestseller: true,
          collection_id: 1,
          material_id: 5,
          category_id: 2,
        },

        {
          article: '0001',
          name: 'Двубортное пальто реглан',
          description:
            'Двубортное пальто объемного кроя с рукавом реглан. Дополнено декоративными погонами и патами',
          model_params: 'Длина изделия 126 см. Рост модели 177 см',
          characteristics:
            'Водоотталкивающий, двубортный, пояс на талии, детали из сатиновой отделки.',
          price: 16500,
          new_price: 0,
          in_stock: false,
          bestseller: false,
          collection_id: 1,
          material_id: 5,
          category_id: 2,
        },

        {
          article: '0001',
          name: 'Двубортное пальто реглан',
          description:
            'Двубортное пальто объемного кроя с рукавом реглан. Дополнено декоративными погонами и патами',
          model_params: 'Длина изделия 126 см. Рост модели 177 см',
          characteristics:
            'Водоотталкивающий, двубортный, пояс на талии, детали из сатиновой отделки.',
          price: 13500,
          new_price: 2500,
          in_stock: true,
          bestseller: false,
          collection_id: 1,
          material_id: 6,
          category_id: 2,
        },

        {
          article: '0001',
          name: 'Двубортное прямое пальто',
          description: 'Двубортное прямое пальто со втачным рукавом',
          model_params: 'Длина изделия 120 см. Рост модели 174 см',
          characteristics:
            'Водоотталкивающий, двубортный, пояс на талии, детали из сатиновой отделки.',
          price: 16500,
          new_price: 0,
          in_stock: false,
          bestseller: false,
          collection_id: 1,
          material_id: 6,
          category_id: 2,
        },

        {
          article: '0001',
          name: 'Двубортное прямое пальто',
          description: 'Двубортное прямое пальто со втачным рукавом',
          model_params: 'Длина изделия 120 см. Рост модели 174 см',
          characteristics:
            'Водоотталкивающий, двубортный, пояс на талии, детали из сатиновой отделки.',
          price: 13500,
          new_price: 2500,
          in_stock: true,
          bestseller: true,
          collection_id: 1,
          material_id: 6,
          category_id: 2,
        },

        {
          article: '0001',
          name: 'Объемное пальто',
          description: 'Объемное пальто прямого кроя со спущенным плечом',
          model_params: 'Длина изделия 125 см. Рост модели 168 см',
          characteristics:
            'Водоотталкивающий, двубортный, пояс на талии, детали из сатиновой отделки.',
          price: 16500,
          new_price: 0,
          in_stock: false,
          bestseller: true,
          collection_id: 1,
          material_id: 7,
          category_id: 2,
        },

        {
          article: '0001',
          name: 'Объемное пальто',
          description: 'Объемное пальто прямого кроя со спущенным плечом',
          model_params: 'Длина изделия 125 см. Рост модели 168 см',
          characteristics:
            'Водоотталкивающий, двубортный, пояс на талии, детали из сатиновой отделки.',
          price: 13500,
          new_price: 2500,
          in_stock: true,
          bestseller: true,
          collection_id: 1,
          material_id: 7,
          category_id: 2,
        },

        {
          article: '0001',
          name: 'Двубортное пальто',
          description: 'Двубортное пальто прямого кроя с манжетами на рукавах',
          model_params: 'Длина изделия 125 см. Рост модели 168 см',
          characteristics:
            'Водоотталкивающий, двубортный, пояс на талии, детали из сатиновой отделки.',
          price: 16500,
          new_price: 0,
          in_stock: false,
          bestseller: true,
          collection_id: 1,
          material_id: 7,
          category_id: 2,
        },

        {
          article: '0001',
          name: 'Двубортное пальто',
          description: 'Двубортное пальто прямого кроя с манжетами на рукавах',
          model_params: 'Длина изделия 125 см. Рост модели 168 см',
          characteristics:
            'Водоотталкивающий, двубортный, пояс на талии, детали из сатиновой отделки.',
          price: 13500,
          new_price: 2500,
          in_stock: true,
          bestseller: false,
          collection_id: 1,
          material_id: 7,
          category_id: 2,
        },

        {
          article: '0001',
          name: 'Приталенное пальто',
          description: 'Приталенное двубортное пальто со втачным рукавом',
          model_params: 'Длина изделия 125 см. Рост модели 168 см.',
          characteristics:
            'Водоотталкивающий, двубортный, пояс на талии, детали из сатиновой отделки.',
          price: 16500,
          new_price: 0,
          in_stock: false,
          bestseller: false,
          collection_id: 1,
          material_id: 8,
          category_id: 2,
        },

        {
          article: '0001',
          name: 'Приталенное пальто',
          description: 'Приталенное двубортное пальто со втачным рукавом',
          model_params: 'Длина изделия 125 см. Рост модели 168 см.',
          characteristics:
            'Водоотталкивающий, двубортный, пояс на талии, детали из сатиновой отделки.',
          price: 13500,
          new_price: 2500,
          in_stock: true,
          bestseller: false,
          collection_id: 1,
          material_id: 8,
          category_id: 2,
        },

        {
          article: '0001',
          name: 'Объемное пальто-жакет',
          description:
            'Объемное пальто-жакет с уширенными плечами и втачным рукавом',
          model_params: 'Длина пальто 85 см. Рост модели 174 см.',
          characteristics:
            'Водоотталкивающий, двубортный, пояс на талии, детали из сатиновой отделки.',
          price: 16500,
          new_price: 0,
          in_stock: false,
          bestseller: false,
          collection_id: 1,
          material_id: 9,
          category_id: 2,
        },

        {
          article: '0001',
          name: 'Объемное пальто-жакет',
          description:
            'Объемное пальто-жакет с уширенными плечами и втачным рукавом',
          model_params: 'Длина пальто 85 см. Рост модели 174 см.',
          characteristics:
            'Водоотталкивающий, двубортный, пояс на талии, детали из сатиновой отделки.',
          price: 13500,
          new_price: 2500,
          in_stock: true,
          bestseller: false,
          collection_id: 1,
          material_id: 9,
          category_id: 2,
        },

        {
          article: '0001',
          name: 'Классическое пальто',
          description: 'Прямое классическое пальто с цельнокроеным рукавом',
          model_params: 'Длина 120 см. Рост модели 172 см.',

          characteristics:
            'Водоотталкивающий, двубортный, пояс на талии, детали из сатиновой отделки.',
          price: 16500,
          new_price: 0,
          in_stock: false,
          bestseller: false,
          collection_id: 1,
          material_id: 9,
          category_id: 2,
        },

        {
          article: '0001',
          name: 'Классическое пальто',
          description: 'Прямое классическое пальто с цельнокроеным рукавом',
          model_params: 'Длина 120 см. Рост модели 172 см.',
          characteristics:
            'Водоотталкивающий, двубортный, пояс на талии, детали из сатиновой отделки.',
          price: 13500,
          new_price: 2500,
          in_stock: true,
          bestseller: false,
          collection_id: 1,
          material_id: 10,
          category_id: 2,
        },

        {
          article: '0001',
          name: 'Базовое пальто',
          description:
            'Прямое базовое пальто среднего объёма со спущенным плечом.',
          model_params: 'Длина 120 см. Рост модели 177 см.',
          characteristics:
            'Водоотталкивающий, двубортный, пояс на талии, детали из сатиновой отделки.',
          price: 16500,
          new_price: 0,
          in_stock: false,
          bestseller: false,
          collection_id: 1,
          material_id: 10,
          category_id: 2,
        },

        {
          article: '0001',
          name: 'Базовое пальто',
          description:
            'Прямое базовое пальто среднего объёма со спущенным плечом.',
          model_params: 'Длина 120 см. Рост модели 177 см.',
          characteristics:
            'Водоотталкивающий, двубортный, пояс на талии, детали из сатиновой отделки.',
          price: 13500,
          new_price: 2500,
          in_stock: true,
          bestseller: false,
          collection_id: 1,
          material_id: 10,
          category_id: 2,
        },

        {
          article: '0001',
          name: 'Шуба с цельнокроеным рукавом',
          description: 'Шуба с цельнокроеным рукавом',
          model_params: 'Длина 120 см. Рост модели 172 см.',
          characteristics:
            'Водоотталкивающий, двубортный, пояс на талии, детали из сатиновой отделки.',
          price: 14500,
          new_price: 0,
          in_stock: false,
          bestseller: true,
          collection_id: 1,
          material_id: 23,
          category_id: 5,
        },

        {
          article: '0001',
          name: 'Шуба с цельнокроеным рукавом',
          description: 'Шуба с цельнокроеным рукавом',
          model_params: 'Длина 120 см. Рост модели 172 см.',
          characteristics:
            'Водоотталкивающий, двубортный, пояс на талии, детали из сатиновой отделки.',
          price: 11500,
          new_price: 2500,
          in_stock: true,
          bestseller: true,
          collection_id: 1,
          material_id: 23,
          category_id: 5,
        },

        {
          article: '0001',
          name: 'Объемная шуба',
          description: 'Объемная шуба',
          model_params: 'Длина 135 см. Рост модели 177 см.',
          characteristics:
            'Водоотталкивающий, двубортный, пояс на талии, детали из сатиновой отделки.',
          price: 14500,
          new_price: 0,
          in_stock: false,
          bestseller: true,
          collection_id: 1,
          material_id: 24,
          category_id: 5,
        },

        {
          article: '0001',
          name: 'Объемная шуба',
          description: 'Объемная шуба',
          model_params: 'Длина 135 см. Рост модели 177 см.',
          characteristics:
            'Водоотталкивающий, двубортный, пояс на талии, детали из сатиновой отделки.',
          price: 11500,
          new_price: 2500,
          in_stock: true,
          bestseller: true,
          collection_id: 1,
          material_id: 27,
          category_id: 5,
        },

        {
          article: '0001',
          name: 'Объемная двубортная шуба',
          description: 'Объемная двубортная шуба',
          model_params: 'Длина 126 см. Рост модели 172 см.',
          characteristics:
            'Водоотталкивающий, двубортный, пояс на талии, детали из сатиновой отделки.',
          price: 14500,
          new_price: 0,
          in_stock: false,
          bestseller: true,
          collection_id: 1,
          material_id: 24,
          category_id: 5,
        },

        {
          article: '0001',
          name: 'Объемная двубортная шуба',
          description: 'Объемная двубортная шуба',
          model_params: 'Длина 135 см. Рост модели 177 см.',
          characteristics:
            'Водоотталкивающий, двубортный, пояс на талии, детали из сатиновой отделки.',
          price: 11500,
          new_price: 2500,
          in_stock: true,
          bestseller: true,
          collection_id: 1,
          material_id: 25,
          category_id: 5,
        },

        {
          article: '0001',
          name: 'Шуба-рубашка',
          description: 'Шуба-рубашка',
          model_params: 'Длина изделия 80 см. Рост модели 168 см.',
          characteristics:
            'Водоотталкивающий, двубортный, пояс на талии, детали из сатиновой отделки.',
          price: 13500,
          new_price: 0,
          in_stock: false,
          bestseller: false,
          collection_id: 1,
          material_id: 25,
          category_id: 5,
        },

        {
          article: '0001',
          name: 'Шуба-рубашка',
          description: 'Шуба-рубашка',
          model_params: 'Длина изделия 80 см. Рост модели 168 см.',
          characteristics:
            'Водоотталкивающий, двубортный, пояс на талии, детали из сатиновой отделки.',
          price: 10500,
          new_price: 2500,
          in_stock: true,
          bestseller: false,
          collection_id: 1,
          material_id: 26,
          category_id: 5,
        },

        {
          article: '0001',
          name: 'Объемный жакет',
          description: 'Объемный жакет прямого кроя',
          model_params: 'Длина жакета 78 см. Рост модели 174 см.',

          characteristics:
            'Водоотталкивающий, двубортный, пояс на талии, детали из сатиновой отделки.',
          price: 9900,
          new_price: 0,
          in_stock: false,
          bestseller: false,
          collection_id: 1,
          material_id: 10,
          category_id: 3,
        },

        {
          article: '0001',
          name: 'Объемный жакет',
          description: 'Объемный жакет прямого кроя',
          model_params: 'Длина жакета 78 см. Рост модели 174 см.',
          characteristics:
            'Водоотталкивающий, двубортный, пояс на талии, детали из сатиновой отделки.',
          price: 7900,
          new_price: 2500,
          in_stock: true,
          bestseller: false,
          collection_id: 1,
          material_id: 10,
          category_id: 3,
        },

        {
          article: '0001',
          name: 'Жакет на завязках',
          description: 'Жакет на завязках',
          model_params: 'Длина жакета 78 см. Рост модели 174 см.',
          characteristics:
            'Водоотталкивающий, двубортный, пояс на талии, детали из сатиновой отделки.',
          price: 9900,
          new_price: 0,
          in_stock: false,
          bestseller: false,
          collection_id: 1,
          material_id: 11,
          category_id: 3,
        },

        {
          article: '0001',
          name: 'Жакет на завязках',
          description: 'Жакет на завязках',
          model_params: 'Длина жакета 78 см. Рост модели 174 см.',
          characteristics:
            'Водоотталкивающий, двубортный, пояс на талии, детали из сатиновой отделки.',
          price: 7900,
          new_price: 2500,
          in_stock: true,
          bestseller: false,
          collection_id: 1,
          material_id: 11,
          category_id: 3,
        },

        {
          article: '0001',
          name: 'Жакет из эко-кожи',
          description: 'Жакет на завязках из эко-кожи',
          model_params: 'Длина жакета 78 см. Рост модели 174 см.',
          characteristics:
            'Водоотталкивающий, двубортный, пояс на талии, детали из сатиновой отделки.',
          price: 9900,
          new_price: 0,
          in_stock: false,
          bestseller: false,
          collection_id: 1,
          material_id: 11,
          category_id: 3,
        },

        {
          article: '0001',
          name: 'Жакет из эко-кожи',
          description: 'Жакет на завязках из эко-кожи',
          model_params: 'Длина жакета 78 см. Рост модели 174 см.',
          characteristics:
            'Водоотталкивающий, двубортный, пояс на талии, детали из сатиновой отделки.',
          price: 7900,
          new_price: 2500,
          in_stock: true,
          bestseller: false,
          collection_id: 1,
          material_id: 12,
          category_id: 3,
        },

        {
          article: '0001',
          name: 'Объемный жакет из эко-кожи',
          description: 'Объемный жакет прямого кроя из эко-кожи',
          model_params: 'Длина жакета 78 см. Рост модели 174 см.',
          characteristics:
            'Водоотталкивающий, двубортный, пояс на талии, детали из сатиновой отделки.',
          price: 9900,
          new_price: 0,
          in_stock: false,
          bestseller: false,
          collection_id: 1,
          material_id: 12,
          category_id: 3,
        },

        {
          article: '0001',
          name: 'Объемный жакет из эко-кожи',
          description: 'Объемный жакет прямого кроя из эко-кожи',
          model_params: 'Длина жакета 78 см. Рост модели 174 см.',
          characteristics:
            'Водоотталкивающий, двубортный, пояс на талии, детали из сатиновой отделки.',
          price: 7900,
          new_price: 2500,
          in_stock: true,
          bestseller: true,
          collection_id: 1,
          material_id: 13,
          category_id: 3,
        },

        {
          article: '0001',
          name: 'Приталенный жакет',
          description: 'Приталенный жакет с акцентными плечами',
          model_params: 'Длина жакета 78 см. Рост модели 174 см.',
          characteristics:
            'Водоотталкивающий, двубортный, пояс на талии, детали из сатиновой отделки.',
          price: 9900,
          new_price: 0,
          in_stock: false,
          bestseller: true,
          collection_id: 1,
          material_id: 13,
          category_id: 3,
        },

        {
          article: '0001',
          name: 'Приталенный жакет',
          description: 'Приталенный жакет с акцентными плечами',
          model_params: 'Длина жакета 78 см. Рост модели 174 см.',
          characteristics:
            'Водоотталкивающий, двубортный, пояс на талии, детали из сатиновой отделки.',
          price: 7900,
          new_price: 2500,
          in_stock: true,
          bestseller: true,
          collection_id: 1,
          material_id: 14,
          category_id: 3,
        },

        {
          article: '0001',
          name: 'Приталенный двубортный жакет',
          description: 'Приталенный двубортный жакет со шнуровкой',
          model_params: 'Длина жакета 78 см. Рост модели 174 см.',
          characteristics:
            'Водоотталкивающий, двубортный, пояс на талии, детали из сатиновой отделки.',
          price: 9900,
          new_price: 0,
          in_stock: false,
          bestseller: true,
          collection_id: 1,
          material_id: 14,
          category_id: 3,
        },

        {
          article: '0001',
          name: 'Приталенный двубортный жакет',
          description: 'Приталенный двубортный жакет со шнуровкой',
          model_params: 'Длина жакета 78 см. Рост модели 174 см.',
          characteristics:
            'Водоотталкивающий, двубортный, пояс на талии, детали из сатиновой отделки.',
          price: 7900,
          new_price: 2500,
          in_stock: true,
          bestseller: true,
          collection_id: 1,
          material_id: 15,
          category_id: 3,
        },

        {
          article: '0001',
          name: 'Жилет',
          description: 'Жилет из плотной костюмной ткани',
          model_params: 'Длина жакета 78 см. Рост модели 174 см.',
          characteristics:
            'Водоотталкивающий, двубортный, пояс на талии, детали из сатиновой отделки.',
          price: 4400,
          new_price: 0,
          in_stock: false,
          bestseller: true,
          collection_id: 1,
          material_id: 15,
          category_id: 3,
        },

        {
          article: '0001',
          name: 'Жилет',
          description: 'Жилет из плотной костюмной ткани',
          model_params: 'Длина жакета 78 см. Рост модели 174 см.',
          characteristics:
            'Водоотталкивающий, двубортный, пояс на талии, детали из сатиновой отделки.',
          price: 3400,
          new_price: 2500,
          in_stock: true,
          bestseller: true,
          collection_id: 1,
          material_id: 15,
          category_id: 3,
        },

        {
          article: '0001',
          name: 'Брюки широкие',
          description:
            'Брюки широкие с одной складкой из плотной костюмной ткани',
          model_params: 'Длина жакета 78 см. Рост модели 174 см.',
          characteristics:
            'Водоотталкивающий, двубортный, пояс на талии, детали из сатиновой отделки.',
          price: 5500,
          new_price: 0,
          in_stock: false,
          bestseller: false,
          collection_id: 1,
          material_id: 17,
          category_id: 4,
        },

        {
          article: '0001',
          name: 'Брюки широкие',
          description:
            'Брюки широкие с одной складкой из плотной костюмной ткани',
          model_params: 'Длина жакета 78 см. Рост модели 174 см.',
          characteristics:
            'Водоотталкивающий, двубортный, пояс на талии, детали из сатиновой отделки.',
          price: 4500,
          new_price: 2500,
          in_stock: true,
          bestseller: false,
          collection_id: 1,
          material_id: 18,
          category_id: 4,
        },

        {
          article: '0001',
          name: 'Брюки широкие',
          description:
            'Брюки широкие с двумя складками из плотной костюмной ткани',
          model_params: 'Длина жакета 78 см. Рост модели 174 см.',
          characteristics:
            'Водоотталкивающий, двубортный, пояс на талии, детали из сатиновой отделки.',
          price: 5500,
          new_price: 0,
          in_stock: false,
          bestseller: false,
          collection_id: 1,
          material_id: 19,
          category_id: 4,
        },

        {
          article: '0001',
          name: 'Брюки широкие',
          description:
            'Брюки широкие с двумя складками из плотной костюмной ткани',
          model_params: 'Длина жакета 78 см. Рост модели 174 см.',
          characteristics:
            'Водоотталкивающий, двубортный, пояс на талии, детали из сатиновой отделки.',
          price: 4500,
          new_price: 2500,
          in_stock: true,
          bestseller: false,
          collection_id: 1,
          material_id: 20,
          category_id: 4,
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Items', null, {});
  },
};
