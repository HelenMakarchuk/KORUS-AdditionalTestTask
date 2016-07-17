using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.ServiceModel.Activation;
using System.ServiceModel.Web;
using System.Text;

namespace WebApplication2
{
    [ServiceContract(Namespace = "")]
    [AspNetCompatibilityRequirements(RequirementsMode = AspNetCompatibilityRequirementsMode.Allowed)]
    public class Service1
    {
        [OperationContract]
        public List<string> F1(string arg)
        {
            DataClasses1DataContext db = new DataClasses1DataContext();
            var contacts = db.Contacts;
            var telephones = db.Telephones;

            List<string> listResult = new List<string>(); int intResult = 0; int max = -1;

            if (arg == "b1") {
                var contactsGroups = contacts.Where(b => b.BirthDate.Month > DateTime.Today.Month && b.BirthDate.Month < DateTime.Today.Month + 2).Select(p => p.FullName).ToList();
                listResult = contactsGroups;
            }
            else if (arg == "b2") {
                DateTime resultDate = new DateTime(DateTime.Today.Year - 30, DateTime.Today.Month, DateTime.Today.Day);

                var contactsGroups = contacts.GroupBy(c => c.Position).Select(g => new {
                    youngPerson = g.Where(d => d.BirthDate > resultDate).Select(d => d.Id).Count(),
                    position = g.Key });

                foreach (var group in contactsGroups) {
                    if (group.youngPerson > max) { max = group.youngPerson; listResult.Add(group.position); }; }
            }
            else if (arg == "b3") {
                var contactsGroups = contacts.GroupBy(c => c.Position).Select(g => new { b = g.Average(s => s.Salary) > contacts.Average(s => s.Salary), position = g.Key });
                foreach (var group in contactsGroups) { if (group.b) listResult.Add(group.position); }   
            }
            else {
                var contactsGroups = contacts.GroupBy(c => c.Position).Select(g => new { persons = g.Where(c => c.Salary > g.Average(s => s.Salary)).Count() });
                foreach (var group in contactsGroups) { intResult += group.persons; }
                listResult.Add(intResult.ToString());
            }
            return listResult;
        }
    }
}

