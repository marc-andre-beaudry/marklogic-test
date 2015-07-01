// Generate Test Triples
// Model is the following : Rack -> CommRoom -> Floor -> Building -> City -> Country -> Region
// Rack is located on a comm  room, comm room is located on a floor...

var namespace       = "http://www.marc.com";
var regionCount     = 4;
var countryCount    = 75;
var cityCount       = 300;
var buildingCount   = 1000;
var floorCount      = 2000;
var commRoomCount   = 5000;
var rackCount       = 20000;

// Delete all triples from database
function clearDb() {
  sem.sparqlUpdate("DELETE where { ?s ?p ?o }");
}

// Generate data and create a located on relationship to a child subject.
function generateData(className, classCount, hasChild, childClassName, childClassCount) {
  for(var classId = 0; classId < classCount; classId++) {
    var typeUri = "<" + namespace + "/" + "classes#" + className + ">";
    var classNameUri = "<" + namespace + "/" + className + "#" + classId + ">";    
    var query = "INSERT DATA { " + classNameUri + " a " + typeUri + " }";
    sem.sparqlUpdate(query);
    if(hasChild == true) {
      var childClassNameUri = "<" + namespace + "/" + childClassName + "#" + (classId % childClassCount) + ">";
      var locatedOnUri = "<" + namespace + "/" + "Relationships#Located_on" + ">"; 
      var relationshipQuery = "INSERT DATA { " + classNameUri + " " + locatedOnUri + " " + childClassNameUri + " }";
      sem.sparqlUpdate(relationshipQuery);
    }
  }    
}

clearDb();
generateData("Region", regionCount, false, "", "");
generateData("Country", countryCount, true, "Region", regionCount);
generateData("City", cityCount, true, "Country", countryCount);
generateData("Building", buildingCount, true, "City", cityCount);
generateData("Floor", floorCount, true, "Building", buildingCount);
generateData("CommRoom", commRoomCount, true, "Floor", floorCount);
generateData("Rack", rackCount, true, "CommRoom", commRoomCount);