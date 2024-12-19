const mongoose = require('mongoose');
const FeedbackModel = require("../models/Feedback.js");  // Assurez-vous que le chemin est correct

const getfeedbacks = async (req, res) => {
  try {
    const feedbacks = await FeedbackModel.find();  // Utilisez FeedbackModel ici
    res.json(feedbacks);
  } catch (error) {
    res.status(500).send(error);
  }
};

const addfeedback = async (req, res) => {
  const { username, rating, comment } = req.body;
  
  // Utilisez FeedbackModel au lieu de Feedback
  const newFeedback = new FeedbackModel({ username, rating, comment });

  try {
    await newFeedback.save();
    res.status(201).json(newFeedback);
  } catch (error) {
    res.status(400).send(error);
  }
};
const removefeedback = async (req, res) => {
  const { id } = req.params;

  try {
    // Supprimer le feedback par ID
    const feedback = await FeedbackModel.findByIdAndDelete(id);
    if (!feedback) {
      return res.status(404).json({ message: 'Feedback not found' });
    }
    res.status(200).json({ message: 'Feedback deleted successfully' });
  } catch (error) {
    res.status(500).send(error);
  }
};
module.exports = { addfeedback, getfeedbacks,removefeedback };