using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using schoolAdmission.src.utils;

namespace schoolAdmission.src.Shared.Filters
{
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
    public class ValidateStudentIdHeaderAttribute : Attribute, IAsyncActionFilter
    {
        public const string HeaderName = "X-Student-Id";
        public const string HttpContextItemKey = "StudentId";

        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            var httpContext = context.HttpContext;

            if ((!httpContext.Request.Headers.TryGetValue(HeaderName, out var studentIdValues) ||
                string.IsNullOrWhiteSpace(studentIdValues.ToString())) &&
                (!httpContext.Request.Headers.TryGetValue("x-apikey", out studentIdValues) ||
                string.IsNullOrWhiteSpace(studentIdValues.ToString())))
            {
                context.Result = new BadRequestObjectResult(
                    SendResponse<object>.Error($"'{HeaderName}' or 'x-apikey' header is required.", null));
                return;
            }

            var studentId = studentIdValues.ToString().Trim();
            httpContext.Items[HttpContextItemKey] = studentId;

            await next();
        }
    }
}
