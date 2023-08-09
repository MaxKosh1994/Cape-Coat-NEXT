/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Items',
      [
        {
          name: 'Двубортный тренч',
          description: 'Двубортный тренч из хлопка с одним рядом пуговиц',
          model_sizes: 'Длина изделия 125 см. Рост модели 174 см',
          care_instructions: 'Только сухая чистка.',
          characteristics:
            'Водоотталкивающий, двубортный, пояс на талии, детали из сатиновой отделки.',
          price: 13500,
          color: 'Бежевый',
          in_stock: false,
          collection_id: 1,
          category_id: 1,
        },

        {
          name: 'Двубортный тренч',
          description: 'Двубортный тренч из хлопка с одним рядом пуговиц',
          model_sizes: 'Длина изделия 125 см. Рост модели 174 см',
          care_instructions: 'Только сухая чистка.',
          characteristics:
            'Водоотталкивающий, двубортный, пояс на талии, детали из сатиновой отделки.',
          price: 10500,
          color: 'Бежевый',
          in_stock: true,
          collection_id: 1,
          category_id: 1,
        },

        {
          name: 'Объемный тренч',
          description: 'Самая объёмная модель тренча в нашей линейке',
          model_sizes: 'Длина изделия 135 см. Рост модели 174 см.',
          care_instructions: 'Только сухая чистка.',
          characteristics:
            'Водоотталкивающий, двубортный, пояс на талии, детали из сатиновой отделки.',
          price: 13500,
          color: 'Кремовый',
          in_stock: false,
          collection_id: 1,
          category_id: 1,
        },

        {
          name: 'Объемный тренч',
          description: 'Самая объёмная модель тренча в нашей линейке',
          model_sizes: 'Длина изделия 135 см. Рост модели 174 см.',
          care_instructions: 'Только сухая чистка.',
          characteristics:
            'Водоотталкивающий, двубортный, пояс на талии, детали из сатиновой отделки.',
          price: 10500,
          color: 'Кремовый',
          in_stock: true,
          collection_id: 1,
          category_id: 1,
        },

        {
          name: 'Среднеобъёмный тренч',
          description: 'Тренч из хлопка среднего объема с манжетами на рукавах',
          model_sizes: 'Длина изделия 125 см. Рост модели 174 см.',
          care_instructions: 'Только сухая чистка.',
          characteristics:
            'Водоотталкивающий, двубортный, пояс на талии, детали из сатиновой отделки.',
          price: 13500,
          color: 'Кремовый',
          in_stock: false,
          collection_id: 1,
          category_id: 1,
        },

        {
          name: 'Среднеобъёмный тренч',
          description: 'Тренч из хлопка среднего объема с манжетами на рукавах',
          model_sizes: 'Длина изделия 125 см. Рост модели 174 см.',
          care_instructions: 'Только сухая чистка.',
          characteristics:
            'Водоотталкивающий, двубортный, пояс на талии, детали из сатиновой отделки.',
          price: 10500,
          color: 'Кремовый',
          in_stock: true,
          collection_id: 1,
          category_id: 1,
        },

        {
          name: 'Тренч прямого кроя',
          description: 'Тренч из хлопка прямого кроя с воротником-стойкой',
          model_sizes: 'Длина изделия 122 см. Рост модели 168 см',
          care_instructions: 'Только сухая чистка.',
          characteristics:
            'Водоотталкивающий, двубортный, пояс на талии, детали из сатиновой отделки.',
          price: 13500,
          color: 'Коричневый',
          in_stock: false,
          collection_id: 1,
          category_id: 1,
        },

        {
          name: 'Тренч прямого кроя',
          description: 'Тренч из хлопка прямого кроя с воротником-стойкой',
          model_sizes: 'Длина изделия 122 см. Рост модели 168 см',
          care_instructions: 'Только сухая чистка.',
          characteristics:
            'Водоотталкивающий, двубортный, пояс на талии, детали из сатиновой отделки.',
          price: 10500,
          color: 'Коричневый',
          in_stock: true,
          collection_id: 1,
          category_id: 1,
        },

        {
          name: 'Классический тренч',
          description: 'Тренч из хлопка классического кроя',
          model_sizes: 'Длина изделия 122 см. Рост модели 174 см.',
          care_instructions: 'Только сухая чистка.',
          characteristics:
            'Водоотталкивающий, двубортный, пояс на талии, детали из сатиновой отделки.',
          price: 13500,
          color: 'Коричневый',
          in_stock: false,
          collection_id: 1,
          category_id: 1,
        },

        {
          name: 'Классический тренч',
          description: 'Тренч из хлопка классического кроя',
          model_sizes: 'Длина изделия 122 см. Рост модели 174 см.',
          care_instructions: 'Только сухая чистка.',
          characteristics:
            'Водоотталкивающий, двубортный, пояс на талии, детали из сатиновой отделки.',
          price: 10500,
          color: 'Коричневый',
          in_stock: true,
          collection_id: 1,
          category_id: 1,
        },

        {
          name: 'Кожаный тренч',
          description: 'Тренч из эко-кожи прямого кроя',
          model_sizes: 'Длина изделия 126 см. Рост модели 174 см.',
          care_instructions: 'Только сухая чистка.',
          characteristics:
            'Водоотталкивающий, двубортный, пояс на талии, детали из сатиновой отделки.',
          price: 13500,
          color: 'Чёрный',
          in_stock: false,
          collection_id: 1,
          category_id: 1,
        },

        {
          name: 'Кожаный тренч',
          description: 'Тренч из эко-кожи прямого кроя',
          model_sizes: 'Длина изделия 126 см. Рост модели 174 см.',
          care_instructions: 'Только сухая чистка.',
          characteristics:
            'Водоотталкивающий, двубортный, пояс на талии, детали из сатиновой отделки.',
          price: 10500,
          color: 'Чёрный',
          in_stock: true,
          collection_id: 1,
          category_id: 1,
        },

        {
          name: 'Кожаный тренч',
          description: 'Тренч из эко-кожи с манжетами',
          model_sizes: 'Длина изделия 126 см. Рост модели 174 см.',
          care_instructions: 'Только сухая чистка.',
          characteristics:
            'Водоотталкивающий, двубортный, пояс на талии, детали из сатиновой отделки.',
          price: 13500,
          color: 'Чёрный',
          in_stock: false,
          collection_id: 1,
          category_id: 1,
        },

        {
          name: 'Кожаный тренч',
          description: 'Тренч из эко-кожи с манжетами',
          model_sizes: 'Длина изделия 126 см. Рост модели 174 см.',
          care_instructions: 'Только сухая чистка.',
          characteristics:
            'Водоотталкивающий, двубортный, пояс на талии, детали из сатиновой отделки.',
          price: 10500,
          color: 'Чёрный',
          in_stock: true,
          collection_id: 1,
          category_id: 1,
        },

        {
          name: 'Двубортное пальто',
          description:
            'Двубортное пальто объемного кроя со спущенным плечом и декоративными погонами',
          model_sizes: 'Длина изделия 125 см. Рост модели 177 см',
          care_instructions: 'Только сухая чистка.',
          characteristics:
            'Водоотталкивающий, двубортный, пояс на талии, детали из сатиновой отделки.',
          price: 16500,
          color: 'Бежевый',
          in_stock: false,
          collection_id: 1,
          category_id: 2,
        },

        {
          name: 'Двубортное пальто',
          description:
            'Двубортное пальто объемного кроя со спущенным плечом и декоративными погонами',
          model_sizes: 'Длина изделия 125 см. Рост модели 177 см',
          care_instructions: 'Только сухая чистка.',
          characteristics:
            'Водоотталкивающий, двубортный, пояс на талии, детали из сатиновой отделки.',
          price: 13500,
          color: 'Бежевый',
          in_stock: true,
          collection_id: 1,
          category_id: 2,
        },

        {
          name: 'Двубортное пальто реглан',
          description:
            'Двубортное пальто объемного кроя с рукавом реглан. Дополнено декоративными погонами и патами',
          model_sizes: 'Длина изделия 126 см. Рост модели 177 см',
          care_instructions: 'Только сухая чистка.',
          characteristics:
            'Водоотталкивающий, двубортный, пояс на талии, детали из сатиновой отделки.',
          price: 16500,
          color: 'Черный',
          in_stock: false,
          collection_id: 1,
          category_id: 2,
        },

        {
          name: 'Двубортное пальто реглан',
          description:
            'Двубортное пальто объемного кроя с рукавом реглан. Дополнено декоративными погонами и патами',
          model_sizes: 'Длина изделия 126 см. Рост модели 177 см',
          care_instructions: 'Только сухая чистка.',
          characteristics:
            'Водоотталкивающий, двубортный, пояс на талии, детали из сатиновой отделки.',
          price: 13500,
          color: 'Черный',
          in_stock: true,
          collection_id: 1,
          category_id: 2,
        },

        {
          name: 'Двубортное прямое пальто',
          description: 'Двубортное прямое пальто со втачным рукавом',
          model_sizes: 'Длина изделия 120 см. Рост модели 174 см',
          care_instructions: 'Только сухая чистка.',
          characteristics:
            'Водоотталкивающий, двубортный, пояс на талии, детали из сатиновой отделки.',
          price: 16500,
          color: 'Песочный',
          in_stock: false,
          collection_id: 1,
          category_id: 2,
        },

        {
          name: 'Двубортное прямое пальто',
          description: 'Двубортное прямое пальто со втачным рукавом',
          model_sizes: 'Длина изделия 120 см. Рост модели 174 см',
          care_instructions: 'Только сухая чистка.',
          characteristics:
            'Водоотталкивающий, двубортный, пояс на талии, детали из сатиновой отделки.',
          price: 13500,
          color: 'Песочный',
          in_stock: true,
          collection_id: 1,
          category_id: 2,
        },

        {
          name: 'Объемное пальто',
          description: 'Объемное пальто прямого кроя со спущенным плечом',
          model_sizes: 'Длина изделия 125 см. Рост модели 168 см',
          care_instructions: 'Только сухая чистка.',
          characteristics:
            'Водоотталкивающий, двубортный, пояс на талии, детали из сатиновой отделки.',
          price: 16500,
          color: 'Чёрный',
          in_stock: false,
          collection_id: 1,
          category_id: 2,
        },

        {
          name: 'Объемное пальто',
          description: 'Объемное пальто прямого кроя со спущенным плечом',
          model_sizes: 'Длина изделия 125 см. Рост модели 168 см',
          care_instructions: 'Только сухая чистка.',
          characteristics:
            'Водоотталкивающий, двубортный, пояс на талии, детали из сатиновой отделки.',
          price: 13500,
          color: 'Чёрный',
          in_stock: true,
          collection_id: 1,
          category_id: 2,
        },

        {
          name: 'Двубортное пальто',
          description: 'Двубортное пальто прямого кроя с манжетами на рукавах',
          model_sizes: 'Длина изделия 125 см. Рост модели 168 см',
          care_instructions: 'Только сухая чистка.',
          characteristics:
            'Водоотталкивающий, двубортный, пояс на талии, детали из сатиновой отделки.',
          price: 16500,
          color: 'Баклажановый',
          in_stock: false,
          collection_id: 1,
          category_id: 2,
        },

        {
          name: 'Двубортное пальто',
          description: 'Двубортное пальто прямого кроя с манжетами на рукавах',
          model_sizes: 'Длина изделия 125 см. Рост модели 168 см',
          care_instructions: 'Только сухая чистка.',
          characteristics:
            'Водоотталкивающий, двубортный, пояс на талии, детали из сатиновой отделки.',
          price: 13500,
          color: 'Баклажановый',
          in_stock: true,
          collection_id: 1,
          category_id: 2,
        },

        {
          name: 'Приталенное пальто',
          description: 'Приталенное двубортное пальто со втачным рукавом',
          model_sizes: 'Длина изделия 125 см. Рост модели 168 см.',
          care_instructions: 'Только сухая чистка.',
          characteristics:
            'Водоотталкивающий, двубортный, пояс на талии, детали из сатиновой отделки.',
          price: 16500,
          color: 'Чёрный',
          in_stock: false,
          collection_id: 1,
          category_id: 2,
        },

        {
          name: 'Приталенное пальто',
          description: 'Приталенное двубортное пальто со втачным рукавом',
          model_sizes: 'Длина изделия 125 см. Рост модели 168 см.',
          care_instructions: 'Только сухая чистка.',
          characteristics:
            'Водоотталкивающий, двубортный, пояс на талии, детали из сатиновой отделки.',
          price: 13500,
          color: 'Чёрный',
          in_stock: true,
          collection_id: 1,
          category_id: 2,
        },

        {
          name: 'Объемное пальто-жакет',
          description:
            'Объемное пальто-жакет с уширенными плечами и втачным рукавом',
          model_sizes: 'Длина пальто 85 см. Рост модели 174 см.',
          care_instructions: 'Только сухая чистка.',
          characteristics:
            'Водоотталкивающий, двубортный, пояс на талии, детали из сатиновой отделки.',
          price: 16500,
          color: 'Чёрный',
          in_stock: false,
          collection_id: 1,
          category_id: 2,
        },

        {
          name: 'Объемное пальто-жакет',
          description:
            'Объемное пальто-жакет с уширенными плечами и втачным рукавом',
          model_sizes: 'Длина пальто 85 см. Рост модели 174 см.',
          care_instructions: 'Только сухая чистка.',
          characteristics:
            'Водоотталкивающий, двубортный, пояс на талии, детали из сатиновой отделки.',
          price: 13500,
          color: 'Чёрный',
          in_stock: true,
          collection_id: 1,
          category_id: 2,
        },

        {
          name: 'Классическое пальто',
          description: 'Прямое классическое пальто с цельнокроеным рукавом',
          model_sizes: 'Длина 120 см. Рост модели 172 см.',
          care_instructions: 'Только сухая чистка.',
          characteristics:
            'Водоотталкивающий, двубортный, пояс на талии, детали из сатиновой отделки.',
          price: 16500,
          color: 'Коричневое',
          in_stock: false,
          collection_id: 1,
          category_id: 2,
        },

        {
          name: 'Классическое пальто',
          description: 'Прямое классическое пальто с цельнокроеным рукавом',
          model_sizes: 'Длина 120 см. Рост модели 172 см.',
          care_instructions: 'Только сухая чистка.',
          characteristics:
            'Водоотталкивающий, двубортный, пояс на талии, детали из сатиновой отделки.',
          price: 13500,
          color: 'Коричневое',
          in_stock: true,
          collection_id: 1,
          category_id: 2,
        },

        {
          name: 'Базовое пальто',
          description:
            'Прямое базовое пальто среднего объёма со спущенным плечом.',
          model_sizes: 'Длина 120 см. Рост модели 177 см.',
          care_instructions: 'Только сухая чистка.',
          characteristics:
            'Водоотталкивающий, двубортный, пояс на талии, детали из сатиновой отделки.',
          price: 16500,
          color: 'Коричневое',
          in_stock: false,
          collection_id: 1,
          category_id: 2,
        },

        {
          name: 'Базовое пальто',
          description:
            'Прямое базовое пальто среднего объёма со спущенным плечом.',
          model_sizes: 'Длина 120 см. Рост модели 177 см.',
          care_instructions: 'Только сухая чистка.',
          characteristics:
            'Водоотталкивающий, двубортный, пояс на талии, детали из сатиновой отделки.',
          price: 13500,
          color: 'Коричневое',
          in_stock: true,
          collection_id: 1,
          category_id: 2,
        },

        {
          name: 'Шуба с цельнокроеным рукавом',
          description: 'Шуба с цельнокроеным рукавом',
          model_sizes: 'Длина 120 см. Рост модели 172 см.',
          care_instructions: 'Только сухая чистка.',
          characteristics:
            'Водоотталкивающий, двубортный, пояс на талии, детали из сатиновой отделки.',
          price: 14500,
          color: 'Кремовый',
          in_stock: false,
          collection_id: 1,
          category_id: 5,
        },

        {
          name: 'Шуба с цельнокроеным рукавом',
          description: 'Шуба с цельнокроеным рукавом',
          model_sizes: 'Длина 120 см. Рост модели 172 см.',
          care_instructions: 'Только сухая чистка.',
          characteristics:
            'Водоотталкивающий, двубортный, пояс на талии, детали из сатиновой отделки.',
          price: 11500,
          color: 'Кремовый',
          in_stock: true,
          collection_id: 1,
          category_id: 5,
        },

        {
          name: 'Объемная шуба',
          description: 'Объемная шуба',
          model_sizes: 'Длина 135 см. Рост модели 177 см.',
          care_instructions: 'Только сухая чистка.',
          characteristics:
            'Водоотталкивающий, двубортный, пояс на талии, детали из сатиновой отделки.',
          price: 14500,
          color: 'Кремовый',
          in_stock: false,
          collection_id: 1,
          category_id: 5,
        },

        {
          name: 'Объемная шуба',
          description: 'Объемная шуба',
          model_sizes: 'Длина 135 см. Рост модели 177 см.',
          care_instructions: 'Только сухая чистка.',
          characteristics:
            'Водоотталкивающий, двубортный, пояс на талии, детали из сатиновой отделки.',
          price: 11500,
          color: 'Кремовый',
          in_stock: true,
          collection_id: 1,
          category_id: 5,
        },

        {
          name: 'Объемная двубортная шуба',
          description: 'Объемная двубортная шуба',
          model_sizes: 'Длина 126 см. Рост модели 172 см.',
          care_instructions: 'Только сухая чистка.',
          characteristics:
            'Водоотталкивающий, двубортный, пояс на талии, детали из сатиновой отделки.',
          price: 14500,
          color: 'Кремовый',
          in_stock: false,
          collection_id: 1,
          category_id: 5,
        },

        {
          name: 'Объемная двубортная шуба',
          description: 'Объемная двубортная шуба',
          model_sizes: 'Длина 135 см. Рост модели 177 см.',
          care_instructions: 'Только сухая чистка.',
          characteristics:
            'Водоотталкивающий, двубортный, пояс на талии, детали из сатиновой отделки.',
          price: 11500,
          color: 'Кремовый',
          in_stock: true,
          collection_id: 1,
          category_id: 5,
        },

        {
          name: 'Шуба-рубашка',
          description: 'Шуба-рубашка',
          model_sizes: 'Длина изделия 80 см. Рост модели 168 см.',
          care_instructions: 'Только сухая чистка.',
          characteristics:
            'Водоотталкивающий, двубортный, пояс на талии, детали из сатиновой отделки.',
          price: 13500,
          color: 'Белый',
          in_stock: false,
          collection_id: 1,
          category_id: 5,
        },

        {
          name: 'Шуба-рубашка',
          description: 'Шуба-рубашка',
          model_sizes: 'Длина изделия 80 см. Рост модели 168 см.',
          care_instructions: 'Только сухая чистка.',
          characteristics:
            'Водоотталкивающий, двубортный, пояс на талии, детали из сатиновой отделки.',
          price: 10500,
          color: 'Белый',
          in_stock: true,
          collection_id: 1,
          category_id: 5,
        },

        {
          name: 'Объемный жакет',
          description: 'Объемный жакет прямого кроя',
          model_sizes: 'Длина жакета 78 см. Рост модели 174 см.',
          care_instructions: 'Только сухая чистка.',
          characteristics:
            'Водоотталкивающий, двубортный, пояс на талии, детали из сатиновой отделки.',
          price: 9900,
          color: 'Чёрный',
          in_stock: false,
          collection_id: 1,
          category_id: 3,
        },

        {
          name: 'Объемный жакет',
          description: 'Объемный жакет прямого кроя',
          model_sizes: 'Длина жакета 78 см. Рост модели 174 см.',
          care_instructions: 'Только сухая чистка.',
          characteristics:
            'Водоотталкивающий, двубортный, пояс на талии, детали из сатиновой отделки.',
          price: 7900,
          color: 'Чёрный',
          in_stock: true,
          collection_id: 1,
          category_id: 3,
        },

        {
          name: 'Жакет на завязках',
          description: 'Жакет на завязках',
          model_sizes: 'Длина жакета 78 см. Рост модели 174 см.',
          care_instructions: 'Только сухая чистка.',
          characteristics:
            'Водоотталкивающий, двубортный, пояс на талии, детали из сатиновой отделки.',
          price: 9900,
          color: 'Голубой',
          in_stock: false,
          collection_id: 1,
          category_id: 3,
        },

        {
          name: 'Жакет на завязках',
          description: 'Жакет на завязках',
          model_sizes: 'Длина жакета 78 см. Рост модели 174 см.',
          care_instructions: 'Только сухая чистка.',
          characteristics:
            'Водоотталкивающий, двубортный, пояс на талии, детали из сатиновой отделки.',
          price: 7900,
          color: 'Голубой',
          in_stock: true,
          collection_id: 1,
          category_id: 3,
        },

        {
          name: 'Жакет из эко-кожи',
          description: 'Жакет на завязках из эко-кожи',
          model_sizes: 'Длина жакета 78 см. Рост модели 174 см.',
          care_instructions: 'Только сухая чистка.',
          characteristics:
            'Водоотталкивающий, двубортный, пояс на талии, детали из сатиновой отделки.',
          price: 9900,
          color: 'Чёрный',
          in_stock: false,
          collection_id: 1,
          category_id: 3,
        },

        {
          name: 'Жакет из эко-кожи',
          description: 'Жакет на завязках из эко-кожи',
          model_sizes: 'Длина жакета 78 см. Рост модели 174 см.',
          care_instructions: 'Только сухая чистка.',
          characteristics:
            'Водоотталкивающий, двубортный, пояс на талии, детали из сатиновой отделки.',
          price: 7900,
          color: 'Чёрный',
          in_stock: true,
          collection_id: 1,
          category_id: 3,
        },

        {
          name: 'Объемный жакет из эко-кожи',
          description: 'Объемный жакет прямого кроя из эко-кожи',
          model_sizes: 'Длина жакета 78 см. Рост модели 174 см.',
          care_instructions: 'Только сухая чистка.',
          characteristics:
            'Водоотталкивающий, двубортный, пояс на талии, детали из сатиновой отделки.',
          price: 9900,
          color: 'Чёрный',
          in_stock: false,
          collection_id: 1,
          category_id: 3,
        },

        {
          name: 'Объемный жакет из эко-кожи',
          description: 'Объемный жакет прямого кроя из эко-кожи',
          model_sizes: 'Длина жакета 78 см. Рост модели 174 см.',
          care_instructions: 'Только сухая чистка.',
          characteristics:
            'Водоотталкивающий, двубортный, пояс на талии, детали из сатиновой отделки.',
          price: 7900,
          color: 'Чёрный',
          in_stock: true,
          collection_id: 1,
          category_id: 3,
        },

        {
          name: 'Приталенный жакет',
          description: 'Приталенный жакет с акцентными плечами',
          model_sizes: 'Длина жакета 78 см. Рост модели 174 см.',
          care_instructions: 'Только сухая чистка.',
          characteristics:
            'Водоотталкивающий, двубортный, пояс на талии, детали из сатиновой отделки.',
          price: 9900,
          color: 'Серый',
          in_stock: false,
          collection_id: 1,
          category_id: 3,
        },

        {
          name: 'Приталенный жакет',
          description: 'Приталенный жакет с акцентными плечами',
          model_sizes: 'Длина жакета 78 см. Рост модели 174 см.',
          care_instructions: 'Только сухая чистка.',
          characteristics:
            'Водоотталкивающий, двубортный, пояс на талии, детали из сатиновой отделки.',
          price: 7900,
          color: 'Серый',
          in_stock: true,
          collection_id: 1,
          category_id: 3,
        },

        {
          name: 'Приталенный двубортный жакет',
          description: 'Приталенный двубортный жакет со шнуровкой',
          model_sizes: 'Длина жакета 78 см. Рост модели 174 см.',
          care_instructions: 'Только сухая чистка.',
          characteristics:
            'Водоотталкивающий, двубортный, пояс на талии, детали из сатиновой отделки.',
          price: 9900,
          color: 'Черный',
          in_stock: false,
          collection_id: 1,
          category_id: 3,
        },

        {
          name: 'Приталенный двубортный жакет',
          description: 'Приталенный двубортный жакет со шнуровкой',
          model_sizes: 'Длина жакета 78 см. Рост модели 174 см.',
          care_instructions: 'Только сухая чистка.',
          characteristics:
            'Водоотталкивающий, двубортный, пояс на талии, детали из сатиновой отделки.',
          price: 7900,
          color: 'Черный',
          in_stock: true,
          collection_id: 1,
          category_id: 3,
        },

        {
          name: 'Жилет',
          description: 'Жилет из плотной костюмной ткани',
          model_sizes: 'Длина жакета 78 см. Рост модели 174 см.',
          care_instructions: 'Только сухая чистка.',
          characteristics:
            'Водоотталкивающий, двубортный, пояс на талии, детали из сатиновой отделки.',
          price: 4400,
          color: 'Серый',
          in_stock: false,
          collection_id: 1,
          category_id: 3,
        },

        {
          name: 'Жилет',
          description: 'Жилет из плотной костюмной ткани',
          model_sizes: 'Длина жакета 78 см. Рост модели 174 см.',
          care_instructions: 'Только сухая чистка.',
          characteristics:
            'Водоотталкивающий, двубортный, пояс на талии, детали из сатиновой отделки.',
          price: 3400,
          color: 'Серый',
          in_stock: true,
          collection_id: 1,
          category_id: 3,
        },

        {
          name: 'Брюки широкие',
          description:
            'Брюки широкие с одной складкой из плотной костюмной ткани',
          model_sizes: 'Длина жакета 78 см. Рост модели 174 см.',
          care_instructions: 'Только сухая чистка.',
          characteristics:
            'Водоотталкивающий, двубортный, пояс на талии, детали из сатиновой отделки.',
          price: 5500,
          color: 'Серый',
          in_stock: false,
          collection_id: 1,
          category_id: 4,
        },

        {
          name: 'Брюки широкие',
          description:
            'Брюки широкие с одной складкой из плотной костюмной ткани',
          model_sizes: 'Длина жакета 78 см. Рост модели 174 см.',
          care_instructions: 'Только сухая чистка.',
          characteristics:
            'Водоотталкивающий, двубортный, пояс на талии, детали из сатиновой отделки.',
          price: 4500,
          color: 'Серый',
          in_stock: true,
          collection_id: 1,
          category_id: 4,
        },

        {
          name: 'Брюки широкие',
          description:
            'Брюки широкие с двумя складками из плотной костюмной ткани',
          model_sizes: 'Длина жакета 78 см. Рост модели 174 см.',
          care_instructions: 'Только сухая чистка.',
          characteristics:
            'Водоотталкивающий, двубортный, пояс на талии, детали из сатиновой отделки.',
          price: 5500,
          color: 'Чёрный',
          in_stock: false,
          collection_id: 1,
          category_id: 4,
        },

        {
          name: 'Брюки широкие',
          description:
            'Брюки широкие с двумя складками из плотной костюмной ткани',
          model_sizes: 'Длина жакета 78 см. Рост модели 174 см.',
          care_instructions: 'Только сухая чистка.',
          characteristics:
            'Водоотталкивающий, двубортный, пояс на талии, детали из сатиновой отделки.',
          price: 4500,
          color: 'Чёрный',
          in_stock: true,
          collection_id: 1,
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
