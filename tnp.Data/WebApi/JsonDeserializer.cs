using Newtonsoft.Json;
using System.IO;
using System.Reflection;

namespace tnp.Data.WebApi
{
    public class JsonDeserializer<T> where T : new()
    {
        public static T DeserializeFromStream(Stream stream)
        {
            T r = default(T);
            using (StreamReader reader = new StreamReader(stream, System.Text.Encoding.UTF8))
            {
                JsonSerializer ser = new JsonSerializer();
                try
                {
                    r = (T)ser.Deserialize(reader, typeof(T));
                }
                catch (JsonReaderException ex)
                {
                    throw ex;
                }
                catch (JsonSerializationException ex)
                {
                    throw ex;
                }
                catch (JsonException ex)
                {
                    throw ex;
                }
            }
            return r;
        }

        public static T DeserializeFromResource(string resourceName)
        {
            T r = default(T);
            var assembly = Assembly.GetExecutingAssembly();

            using (Stream stream = assembly.GetManifestResourceStream(resourceName))
            using (StreamReader reader = new StreamReader(stream, System.Text.Encoding.UTF8))
            {
                JsonSerializer ser = new JsonSerializer();
                r = (T)ser.Deserialize(reader, typeof(T));
            }
            return r;
        }

        public static T DeserializeFromString(string content)
        {
            T r = default(T);
            r = JsonConvert.DeserializeObject<T>(content);
            return r;
        }
    }
}
