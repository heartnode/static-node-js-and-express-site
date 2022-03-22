const express = require('express');
const data = require('./data.json');
const path = require('path');
const PORT =  process.env.PORT || 3000;

const app = express();

// Setup Middleware
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//Set the static file middleware to point to public folder
app.use('/static',express.static(path.join(__dirname, 'public')));

//set default root route
app.get('/',(req,res)=>{
    // Renders index.pug with the projects array
    res.locals.projects = data.projects;
    res.render('index');
});

app.get('/about',(req,res)=>{
    //Render about.pug
    res.render('about');
});

//Dynamic project routes
app.get('/project/:id',(req,res,next)=>{
    //Get the ID and parse it into Integer
    const id = +req.params.id;

    //Making sure is a valid Integer
    if (isNaN(id)){
        const err = new Error('Not a valid Project ID');
        err.status = 404;
        //Pass to the next middleware for not being a valid project ID
        return next(err);
    }

    //Get the matching Project base on the passing in project ID
    const project = data.projects.find(project=>project.id === id);
    if (project === undefined){
        //If the Project Id doesn't exists throws Project Not Found error.
        const err = new Error('Project Not Found');
        err.status = 404;
        return next(err);
    }
    //Render the project.pug with the project object
    res.render('project',{project});
});

// catch 404 and renders the error page
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    res.status(404).render('page-not-found',{err:err});
});

// global error handlers
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.render('error', {err});
});


app.listen(PORT,()=>console.log(`Listening on ${PORT}`));