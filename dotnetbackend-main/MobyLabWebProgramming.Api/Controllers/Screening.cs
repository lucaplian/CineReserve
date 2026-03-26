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

public class ScreeningController(ILogger<ScreeningController> logger, IUserService userService, IScreeningService ScreeningService) 
    : AuthorizedController(logger, userService)
{
    [Authorize] // You need to use this attribute to protect the route access, it will return a Forbidden status code if the JWT is not present or invalid, and also it will decode the JWT token.
    [HttpGet("{id:guid}")] // This attribute will make the controller respond to a HTTP GET request on the route /api/User/GetById/<some_guid>.
    public async Task<ActionResult<RequestResponse<ScreeningRecord>>> GetById([FromRoute] Guid id) // The FromRoute attribute will bind the id from the route to this parameter.
    {
        var currentUser = await GetCurrentUser();
        return currentUser.Result != null ? FromServiceResponse(await ScreeningService.GetScreening(id)) :
            ErrorMessageResult<ScreeningRecord>(currentUser.Error);
    }
    
    [Authorize]
    [HttpGet]
    public async Task<ActionResult<RequestResponse<PagedResponse<ScreeningRecord>>>> GetPage([FromQuery] PaginationSearchQueryParams pagination) // The FromQuery attribute will bind the parameters matching the names of
    // the PaginationSearchQueryParams properties to the object in the method parameter.
    {
        var currentUser = await GetCurrentUser();
        return currentUser.Result != null ? FromServiceResponse(await ScreeningService.GetScreenings(pagination)) :
            ErrorMessageResult<PagedResponse<ScreeningRecord>>(currentUser.Error);

    }
    
    [Authorize]
    [HttpPost] // This attribute will make the controller respond to a HTTP POST request on the route /api/User/Add.
    public async Task<ActionResult<RequestResponse>> Add([FromBody] ScreeningAddRecord Screening)
    {
        var currentUser = await GetCurrentUser();

        return currentUser.Result != null ?
            FromServiceResponse(await ScreeningService.AddScreening(Screening, currentUser.Result)) :
            ErrorMessageResult(currentUser.Error);
    }
    
    [Authorize]
    [HttpPut] // This attribute will make the controller respond to a HTTP PUT request on the route /api/User/Update.
    public async Task<ActionResult<RequestResponse>> Update([FromBody] ScreeningUpdateRecord Screening)  // The FromBody attribute indicates that the parameter is deserialized from the JSON body.
    {
        var currentUser = await GetCurrentUser();

        return currentUser.Result != null ?
            FromServiceResponse(await ScreeningService.UpdateScreening(Screening, currentUser.Result)) :
            ErrorMessageResult(currentUser.Error);
    }
    
    [Authorize]
    [HttpDelete("{id:guid}")] // This attribute will make the controller respond to an HTTP DELETE request on the route /api/User/Delete/<some_guid>.
    public async Task<ActionResult<RequestResponse>> Delete([FromRoute] Guid id) // The FromRoute attribute will bind the id from the route to this parameter.
    {
        var currentUser = await GetCurrentUser();

        return currentUser.Result != null ?
            FromServiceResponse(await ScreeningService.DeleteScreening(id, currentUser.Result)) :
            ErrorMessageResult(currentUser.Error);
    }

}