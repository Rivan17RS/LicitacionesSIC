using DTO;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DTO
{
    public class Response
    {
        public string Title {  get; set; }
        public string Content { get; set; }

        public ResponseType ResponseType { get; set; }

        public Response() { }

        public Response(string Title, string Content, ResponseType ResponseType) {
            this.Title = Title;
            this.Content = Content;
            this.ResponseType = ResponseType;
        }

        public static Response CreateResponse(string JsonString) {
            var dataObject = JsonConvert.DeserializeObject<Response>(JsonString);

            return dataObject;
        }

        public string GetResponse()
        {
            if (Content == null)
            {
                return $"No response \n"
                    + $"Error Type: {ResponseType}";
            }
            return $"Title: {this.Title}\n"
                + $"Content: {this.Content}\n"
                + $"ResponseType: {this.ResponseType}";
        }
    }
}