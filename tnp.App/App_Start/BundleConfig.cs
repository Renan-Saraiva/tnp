using System.Web;
using System.Web.Optimization;

namespace tnp.App
{
    public class BundleConfig
    {
        // For more information on Bundling, visit http://go.microsoft.com/fwlink/?LinkId=254725
        public static void RegisterBundles(BundleCollection bundles)
        {
            #region Java Script
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryui").Include(
                        "~/Scripts/jquery-ui/jquery-ui-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery-val/jquery.validate*",        
                        "~/Scripts/jquery-val/jquery.unobtrusive*"));

            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/others/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                        "~/Scripts/bootstrap/bootstrap.js"));

            bundles.Add(new ScriptBundle("~/bundles/toastr").Include(
                        "~/Scripts/toastr/toastr.js"));

            bundles.Add(new ScriptBundle("~/bundles/_Layout").Include(
                        "~/Scripts/slimscroll/jquery.slimscroll.js",
                        "~/Scripts/fastclick/fastclick.js",
                        "~/Scripts/tnp/app.js"));

            bundles.Add(new ScriptBundle("~/bundles/global").Include(
                        "~/Scripts/global/helper.js",
                        "~/Scripts/global/voice.js",
                        "~/Scripts/global/search.js"));

            bundles.Add(new ScriptBundle("~/bundles/spTrans").Include(
                        "~/Scripts/spTrans/DoRequest.js",
                        "~/Scripts/spTrans/Linhas.js",
                        "~/Scripts/spTrans/Paradas.js",
                        "~/Scripts/spTrans/Corredores.js",
                        "~/Scripts/spTrans/Favoritos.js"));

            bundles.Add(new ScriptBundle("~/bundles/spTransLogin").Include(
                        "~/Scripts/spTrans/spTransLogin.js"));

            bundles.Add(new ScriptBundle("~/bundles/icheck").Include(
                        "~/Scripts/icheck/icheck.js"));

            bundles.Add(new ScriptBundle("~/bundles/gmaps").Include(
                        "~/Scripts/google-maps/initialize.js"));            
            #endregion

            #region Styles
            bundles.Add(new StyleBundle("~/Content/tnp/Account").Include(
                        "~/Content/tnp/AdminLTE.css",
                        "~/Scripts/icheck/square/blue.css"));

            bundles.Add(new StyleBundle("~/Content/tnp/site").Include(
                "~/Content/tnp/AdminLTE.css",
                "~/Content/tnp/tnp_global.css",
                "~/Content/tnp/skins/_all-skins.css",
                "~/Scripts/icheck/square/blue.css"));

            bundles.Add(new StyleBundle("~/Content/bootstrapcss").Include(
                        "~/Content/bootstrap/bootstrap.css"));

            bundles.Add(new StyleBundle("~/Content/bootstrap-theme").Include(
                        "~/Content/bootstrap/bootstrap-theme.css"));

            bundles.Add(new StyleBundle("~/Content/toastrcss").Include(
                        "~/Content/toastr/toastr.css"));
            #endregion

            BundleTable.EnableOptimizations = true;
        }
    }
}