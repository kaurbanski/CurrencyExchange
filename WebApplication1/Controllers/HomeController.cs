using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace WebApplication1.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult MidCurrency()
        {
            return View();
        }

        public ActionResult Index()
        {
            return RedirectToAction("MidCurrency");
        }

        public ActionResult BidAskCurrency()
        {
            return View();
        }

        public ActionResult Quotations()
        {
            return View();
        }

        public ActionResult Gold()
        {
            return View();
        }

        public ActionResult CurrencyExchange()
        {
            return View();
        }
    }
}