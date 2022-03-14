// Get the mongoose object
import mongoose from 'mongoose';

// Prepare to the database exercises_db in the MongoDB server running locally on port 27017
mongoose.connect('mongodb://localhost:27017/exercises_db', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

// Connect to to the database
const db = mongoose.connection;
// The open event is called when the database connection successfully opens
db.once('open', () => {
	console.log('Successfully connected to MongoDB using Mongoose!');
});

// Define the schema
const exerciseSchema = mongoose.Schema({
	name: { type: String, required: true },
	reps : { type: Number, required: true },
	weight: { type: Number, required: true },
	unit: { type: String, required: true},	// only kgs and lbs allowed - ??
	date: { type: String, required: true}  // MM-DD-YY
});

// Compile the model from the schema. Must be done after defining the schema.
const Exercise = mongoose.model('Exercise', exerciseSchema);

/** Create an exercise
 * @param {String} name
 * @param {Number} reps
 * @param {Number} weight
 * @param {String} unit
 * @param {String} date
 * @returns A promise that resolves to the JSON object for the newly created resource. Includes ID of new resource */
const createExercise = async (name, reps, weight, unit, date) => {
	// Call the constructor to create an instance of the model class Movie
	const exercise = new Exercise({
		 name: name,
		 reps: reps,
		 weight: weight,
		 unit: unit,
		 date: date
	});
	// Call save to persist in DB
	return exercise.save();
};

/**
 * Retrive movies based on the filter, projection and limit parameters
 * @param {Object} filter
 * @param {String} projection
 * @param {Number} limit
 * @returns
 */
const findExercises = async (filter, projection, limit) => {
	const query = Exercise.find(filter).select(projection).limit(limit);
	return query.exec();
};


/** Retrieve the exercise with the given ID value
 * @param {String} _id
 **/
const findById = async (_id) => {
	const query = Exercise.findById(_id);
	return query.exec();
};


/** Delete the movie with the given ID value
 * @param {String} _id
 * @returns A promise. Resolves to the count of deleted documents
 **/
 const deleteById = async (_id) => {
	const result = await Exercise.deleteOne({ _id: _id });
    return result.deletedCount;
}


/**
 * Replace properties of the movie with the id value provided
 * @param {String} _id
 * @param {String} name
 * @param {Number} reps
 * @param {Number} weight
 * @param {String} unit
 * @param {String} date
 * @returns A promise. Resolves to the number of documents modified
 **/
const replaceExercise = async (_id, name, reps, weight, unit, date) => {
	const result = await Exercise.replaceOne(
		{ _id: _id },
		{ 
			name: name,
			reps: reps,
			weight: weight,
			unit: unit,
			date: date
		}
	);
	return result.matchedCount
};


export { createExercise, findById, deleteById, findExercises, replaceExercise };
