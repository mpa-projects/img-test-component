How does it work?

- Run `npm install my-component --save`
- Add an import to the npm packages `import my-component;`
- Then you can use the element anywhere in your template, JSX, html etc

-It has 2 props
category-url -expects something like -https://pcsa57ebsj.execute-api.us-east-1.amazonaws.com/api/products/categories
product-url -expects something likehttps://pcsa57ebsj.execute-api.us-east-1.amazonaws.com/api/products/search?query=

Search works on presing space
-first it will check are there categories
-if categories are there you can start typing product name it will only look for item in that category and press space(it will look for it even if you press one letter)
-It is case sensitive and pressing X will reset the form

What needs to be done:
-styles fix for sure
-search improvements

Good thing:
-If you need this for any project you can just import it(react,angular,vue,ionic)
-Ps. I know you won't use this in your project :D lol :D
