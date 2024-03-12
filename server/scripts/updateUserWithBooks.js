const mongoose = require('mongoose');
const User = require('../models/User');
const Book = require('../models/Books');

async function updateBooksForUser() {
  try {
    // Connectez-vous à la base de données
    await mongoose.connect('MONGO_DB_URI', { useNewUrlParser: true, useUnifiedTopology: true });

    // Récupérez l'utilisateur avec l'ID spécifique
    const userId = '65e1d585f46c9eba83972ac6';
    const user = await User.findById(userId);

    if (!user) {
      console.error('Utilisateur non trouvé.');
      return;
    }

    // Obtenez les IDs spécifiques des livres que vous souhaitez associer à l'utilisateur
    const bookIds = ['65c6467062942cc32b92d94e', '65c64ae062942cc32b92d952', '65cb305cf771b63c6c56dfc8', '65e1d029f46c9eba83972aba'];

    // Récupérez les livres spécifiques à partir de leurs IDs
    const booksToUpdate = await Book.find({ _id: { $in: bookIds } });

    // Mettez à jour chaque livre et associez-le à l'utilisateur
    for (const book of booksToUpdate) {
      // Mettez à jour le champ 'user' dans le livre
      book.user = userId;

      // Ajoutez l'ID du livre au tableau 'books' de l'utilisateur
      user.books.push(book._id);

      // Sauvegardez les modifications dans le livre
      await book.save();
    }

    // Sauvegardez les modifications dans l'utilisateur
    await user.save();

    console.log('Mise à jour des livres pour l\'utilisateur terminée.');
  } catch (error) {
    console.error('Erreur lors de la mise à jour des livres pour l\'utilisateur:', error);
  } finally {
    // Déconnectez-vous de la base de données
    await mongoose.disconnect();
  }
}

// Exécutez la fonction de mise à jour
updateBooksForUser();
