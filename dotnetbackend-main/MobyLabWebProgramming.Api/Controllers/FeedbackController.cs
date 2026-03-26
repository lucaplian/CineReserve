using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MobyLabWebProgramming.Database.Repository.Entities;
using MobyLabWebProgramming.Infrastructure.Authorization;
using MobyLabWebProgramming.Infrastructure.Requests;
using MobyLabWebProgramming.Infrastructure.Responses;
using MobyLabWebProgramming.Services.Abstractions;
using MobyLabWebProgramming.Services.Authorization;
using MobyLabWebProgramming.Services.DataTransferObjects;

namespace MobyLabWebProgramming.Api.Controllers;

/// <summary>
/// This is a controller example for CRUD operations on users.
/// Inject the required services through the constructor.
/// </summary>
[ApiController] // This attribute specifies for the framework to add functionality to the controller such as binding multipart/form-data.
[Route("api/[controller]/[action]")] // The Route attribute prefixes the routes/url paths with template provides as a string, the keywords between [] are used to automatically take the controller and method name.

public class FeedbackController(ILogger<FeedbackController> logger, IUserService userService, IFeedbackService FeedbackService) 
    : AuthorizedController(logger, userService)
{
    [Authorize] // You need to use this attribute to protect the route access, it will return a Forbidden status code if the JWT is not present or invalid, and also it will decode the JWT token.
    [HttpGet("{id:guid}")] // This attribute will make the controller respond to a HTTP GET request on the route /api/User/GetById/<some_guid>.
    public async Task<ActionResult<RequestResponse<FeedbackRecord>>> GetById([FromRoute] Guid id) // The FromRoute attribute will bind the id from the route to this parameter.
    {
        var currentUser = await GetCurrentUser();
        return currentUser.Result != null ? FromServiceResponse(await FeedbackService.GetFeedback(id)) :
            ErrorMessageResult<FeedbackRecord>(currentUser.Error);
    }
    
    [Authorize]
    [HttpGet]
    public async Task<ActionResult<RequestResponse<PagedResponse<FeedbackRecord>>>> GetPage([FromQuery] PaginationSearchQueryParams pagination) // The FromQuery attribute will bind the parameters matching the names of
    // the PaginationSearchQueryParams properties to the object in the method parameter.
    {
        var currentUser = await GetCurrentUser();
        return currentUser.Result != null ? FromServiceResponse(await FeedbackService.GetFeedbacks(pagination)) :
            ErrorMessageResult<PagedResponse<FeedbackRecord>>(currentUser.Error);

    }
    
    [Authorize]
    [HttpPost] // This attribute will make the controller respond to a HTTP POST request on the route /api/User/Add.
    public async Task<ActionResult<RequestResponse>> Add([FromBody] FeedbackAddRecord Feedback)
    {
        var currentUser = await GetCurrentUser();

        return currentUser.Result != null ?
            FromServiceResponse(await FeedbackService.AddFeedback(Feedback, currentUser.Result)) :
            ErrorMessageResult(currentUser.Error);
    }
    
    [Authorize]
    [HttpPut] // This attribute will make the controller respond to a HTTP PUT request on the route /api/User/Update.
    public async Task<ActionResult<RequestResponse>> Update([FromBody] FeedbackUpdateRecord Feedback)  // The FromBody attribute indicates that the parameter is deserialized from the JSON body.
    {
        var currentUser = await GetCurrentUser();

        return currentUser.Result != null ?
            FromServiceResponse(await FeedbackService.UpdateFeedback(Feedback, currentUser.Result)) :
            ErrorMessageResult(currentUser.Error);
    }
    
    [Authorize]
    [HttpDelete("{id:guid}")] // This attribute will make the controller respond to an HTTP DELETE request on the route /api/User/Delete/<some_guid>.
    public async Task<ActionResult<RequestResponse>> Delete([FromRoute] Guid id) // The FromRoute attribute will bind the id from the route to this parameter.
    {
        var currentUser = await GetCurrentUser();

        return currentUser.Result != null ?
            FromServiceResponse(await FeedbackService.DeleteFeedback(id, currentUser.Result)) :
            ErrorMessageResult(currentUser.Error);
    }

}