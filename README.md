# How to install and run

You'll need CouchDB and Node.js installed before going through the steps below.

```sh
npm install
npm start
npm run couchdb  # in a different TTY
```

Point one or more web browsers at `http://localhost:8080/`. Keep in mind that the appcache will aggressively prevent code changes from showing up as long as caching is enabled.


# References

- [PouchDB](https://pouchdb.com/)
- [CouchDB](http://couchdb.apache.org/)
- [Application Cache](http://www.html5rocks.com/en/tutorials/appcache/beginner/)

# Also of Interest

- [Hood.ie: a PouchDB based offline first framework](http://hood.ie/)
- [A comparison of other synchronization options](http://kinto.readthedocs.org/en/latest/overview.html#comparison)
