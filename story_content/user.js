function ExecuteScript(strId)
{
  switch (strId)
  {
      case "6cSUaHsB6cu":
        Script1();
        break;
      case "6J4Du0Kd6ow":
        Script2();
        break;
  }
}

function Script1()
{
  var btnvolver = parent.document.getElementById('btnvolver');
var scoid= btnvolver.getAttribute("data-sco");
var url= "https://www.misfinanzasparainvertir.com/certificado/pdflib.php?id="+scoid;
window.open(url,'_blank');
}

function Script2()
{
  //get LMS API
var lmsAPI = parent;
//set status; possible values: "completed","incomplete", "failed", "passed"
//set status; possible values: "completed","passed", "icomplete", "failed"
SCORM_CallLMSSetValue("cmi.core.lesson_status", "completed");
}

