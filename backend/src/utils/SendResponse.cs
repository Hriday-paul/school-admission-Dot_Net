using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace schoolAdmission.src.utils
{
    public class SendResponse<T>
    {
        public bool success { get; set; }
        public string message { get; set; }
        public T? data { get; set; }
        public object? error { get; set; }

        public SendResponse(bool success, string message, T? data, object? error)
        {
            this.success = success;
            this.message = message;
            this.data = data;
            this.error = error;
        }

        public static SendResponse<T> Success(string message, T data)
        {
            return new SendResponse<T>(true, message, data, null);
        }

        public static SendResponse<T> Error(string message, object? error)
        {
            return new SendResponse<T>(false, message, default(T), error);
        }

    }
}