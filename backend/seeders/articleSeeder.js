const mongoose = require("mongoose");
const { faker } = require("@faker-js/faker"); // استخدام المكتبة الصحيحة

const Article = require("../models/article"); // تأكد من أن المسار صحيح
const User = require("../models/user"); // تأكد من أن المسار صحيح
const connectDB = require("../config/db"); // استيراد الاتصال
connectDB(); // الاتصال بقاعدة البيانات

const seedArticles = async () => {
  try {
    // إنشاء مقالات وهمية
    const articles = [];
    for (let i = 0; i < 3; i++) {
      const author = await User.aggregate([{ $sample: { size: 1 } }]); // اختيار مستخدم عشوائي

      const article = new Article({
        title: faker.lorem.sentence(),
        content: {
          description: faker.lorem.paragraph(),
          victimInfo: faker.lorem.sentence(),
          suspectInfo: faker.lorem.sentence(),
          weaponsUsed: faker.lorem.sentence(),
          suicideDetails: faker.lorem.sentence(),
          evidenceNotes: faker.lorem.sentence(),
          witnessReports: faker.lorem.sentence(),
          officerInCharge: faker.person.fullName(), // تغيير دالة fullName
          caseStatus: faker.helpers.arrayElement(["open", "closed"]), // التعديل هنا
          publicRisk: faker.helpers.arrayElement(["none", "low", "high"]), // التعديل هنا
          relatedCases: faker.lorem.sentence(),
        },
        author: author[0]._id, // تعديل لاختيار _id من المستخدم العشوائي
        categories: "Murder",
        tags: [faker.lorem.word(), faker.lorem.word()],
        featuredImage: faker.image.url(), // التعديل هنا
        media: [faker.image.url(), faker.image.url()], // التعديل هنا أيضًا
        status: "Pending",
        publishDate: faker.date.past(),
        views: faker.number.int(),
        comments: [],
        likes: faker.number.int(),
        location: {
          city: faker.address.city(),
          country: faker.address.country(),
        },
      });

      articles.push(article);
    }

    // إدخال المقالات في قاعدة البيانات
    await Article.insertMany(articles);
    console.log("Seed data has been successfully added!");
    mongoose.connection.close(); // إغلاق الاتصال بقاعدة البيانات بعد الانتهاء
  } catch (error) {
    console.error("Error seeding data:", error);
  }
};

seedArticles();
