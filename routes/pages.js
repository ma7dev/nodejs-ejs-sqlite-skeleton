module.exports = {
  // home page
  getHomePage: async (req, res) => {
    console.log('getHomePage');
    console.log('User permission: ', req.cookies.webApp);

    res.render('main', {
      title: 'main',
      user: req.cookies.webApp,
    });
  },

  // 404 page
  get404Page: (req, res) => {
    console.log('get404Page');
    console.log('User permission: ', req.cookies.webApp);

    res.render('404', {
      title: '404',
      user: req.cookies.webApp,
    });
  },
};