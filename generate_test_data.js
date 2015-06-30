// Generate Test Triples
// Model is the following : Rack -> CommRoom -> Floor -> Building -> City -> Country -> Region

function clearDb() {
  sem.sparqlUpdate("DELETE where { ?s ?p ?o }");
}

function generateGeneric(subjectName, count, hasChild, childName, childCount) {
  for(var i = 0; i < count; i++) {
    var type = "<Class#" + subjectName + ">";
    var subject = "<" + subjectName + "#" + i + ">";
    var predicate = "<Attribute#Code>";
    var object = genericAttribute + subjectName + i + "\"";
    
    var typeQuery = "INSERT DATA { " + subject + " a " + type + " }";
    var attributeQuery = "INSERT DATA { " + subject + " " + predicate + " " + object + " }";
    sem.sparqlUpdate(typeQuery);
    sem.sparqlUpdate(attributeQuery);
    if(hasChild == true) {
      var childObject = "<" + childName + "#" + (i % childCount) + ">";
      var relationshipQuery = "INSERT DATA { " + subject + " " + locatedOnPredicate + " " + childObject + " }";
      sem.sparqlUpdate(relationshipQuery);
    }
  }    
}

var type = "rdf:type";
var locatedOnPredicate = "<Relationships#Located_on>";
var genericPredicate = "<Attribute#Name>";
var genericAttribute = "\"Name=";

var regionCount     = 4;
var countryCount    = 50;
var cityCount       = 200;
var buildingCount   = 500;
var floorCount      = 1000;
var commRoomCount   = 2000;
var rackCount       = 10000;

//var regionCount     = 4;
//var countryCount    = 8;
//var cityCount       = 16;
//var buildingCount   = 32;
//var floorCount      = 64;
//var commRoomCount   = 128;
//var rackCount       = 256;

clearDb();
generateGeneric("Region", regionCount, false, "", "");
generateGeneric("Country", countryCount, true, "Region", regionCount);
generateGeneric("City", cityCount, true, "Country", countryCount);
generateGeneric("Building", buildingCount, true, "City", cityCount);
generateGeneric("Floor", floorCount, true, "Building", buildingCount);
generateGeneric("CommRoom", commRoomCount, true, "Floor", floorCount);
generateGeneric("Rack", rackCount, true, "CommRoom", commRoomCount);