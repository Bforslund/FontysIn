package service.resources;

import service.model.*;
import service.model.dto.ContactDTO;
import service.model.dto.UserDTO;
import service.repository.FakeDataProfile;

import javax.ws.rs.*;
import javax.ws.rs.core.*;
import java.net.URI;
import java.util.ArrayList;
import java.util.List;

@Path("users")
public class UsersResources {
	private final FakeDataProfile fakeDataProfile = FakeDataProfile.getInstance();
	@Context
	private UriInfo uriInfo;

	/*------------------------------------------------------------------------------- Contacts ----------------------------------------------------------------------------- */

	@GET //GET at http://localhost:XXXX/users/1/contacts
	@Path("{id}/contacts")
	public Response getContacts(@PathParam("id") int id) { // returns users list or contacts list?

		List<ContactDTO> contacts = fakeDataProfile.getAllContactsDTO(id);

		GenericEntity<List<ContactDTO>> entity = new GenericEntity<>(contacts) { };

		return Response.ok(entity).build();
	}

	@GET //GET at http://localhost:XXXX/users/1/acceptedContacts
	@Path("{id}/acceptedContacts")
	public Response getAcceptedContacts(@PathParam("id") int id) { // returns users list or contacts list?

		List<ContactDTO> contacts = fakeDataProfile.getContactsDTO(id);

		GenericEntity<List<ContactDTO>> entity = new GenericEntity<>(contacts) { };

		return Response.ok(entity).build();
	}

	@GET //GET at http://localhost:XXXX/users/1/requests
	@Path("{id}/requests")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getContactsRequests(@PathParam("id") int id) { // returns users list or contacts list?
		List<ContactDTO> requests = fakeDataProfile.getContactsRequestsDTO(id);

		GenericEntity<List<ContactDTO>> entity = new GenericEntity<>(requests) { };

		return Response.ok(entity).build();
	}

	@POST //POST at http://localhost:XXXX/users/1
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("{userId}/contacts")
	public Response createContact(@PathParam("userId") int userId, ContactDTO contact) {

		int contactId = fakeDataProfile.createContact(contact);
		if (contactId < 0){ // already friends
			//String entity =  "You and user with id " + contact.getFriendId() + " are already connected.";
			String entity =  "You and user with id " + contact.getFriend().getId() + " are already connected.";

			return Response.status(Response.Status.CONFLICT).entity(entity).build();
		} else {
			String url = uriInfo.getAbsolutePath() + "/" + contactId; // url of the created contact
			URI uri = URI.create(url);
			return Response.created(uri).build();
		}
	}

	@DELETE //DELETE at http://localhost:XXXX/users/1/contacts/2
	@Path("{userId}/contacts/{contactId}")
	public Response deleteContact(@PathParam("userId") int userId, @PathParam("contactId") int contactId) {
		fakeDataProfile.deleteContact(userId, contactId);

		return Response.noContent().build();
	}

	// Update contact (used to Accept contact)
	@PATCH //PATCH at http://localhost:XXXX/users/1/contacts/2
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("{userId}/contacts/{contactId}")
	public Response updateContact(@PathParam("userId") int userId, @PathParam("contactId") int contactId, Contact contact) {
		fakeDataProfile.updateContact(contactId, contact);

		return Response.noContent().build();
	}

	@GET
	@Path("{userId}")
	public Response getUser(@PathParam("userId") int userId) {
		UserDTO user = fakeDataProfile.getUserDTO(userId);

		if(user != null){
			return Response.ok(user).build(); // Status ok 200, return user
		}
		else {
			return Response.status(Response.Status.BAD_REQUEST).entity("Please provide a valid user id").build();
		}
	}
	/*------------------------------------------------------------------------------- Contacts ----------------------------------------------------------------------------- */



	//to get all the experiences
	@GET //GET at http://localhost:XXXX/profile/experiences
	@Path("{userId}/profiles/{profileId}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response GetProfile(@PathParam("userId") int userId, @PathParam("profileId") int profileId) {

		List<Profile> foundProfiles = fakeDataProfile.GetProfileByUserId(userId); // getting the profile by userid

		if (foundProfiles == null) {
			return Response.status(Response.Status.BAD_REQUEST).entity("Please provide a valid student number.").build();
		} else {

			for (Profile p: foundProfiles){
				if(p.getId() == profileId){
					List<Education> educationByProfileId = fakeDataProfile.GetEducationsByProfileId(profileId);
					List<Experience> experienceByProfileId = fakeDataProfile.GetExperiencesByProfileID(profileId);
					List<About> aboutByProfileId = fakeDataProfile.GetAboutByProfileID(profileId);
					List<Skill> skillByProfileId = fakeDataProfile.GetSkillByProfileID(profileId);

					// to combine different types of lists into 1
					List<Object> combined = new ArrayList<>();
					combined.add(educationByProfileId);
					combined.add(experienceByProfileId);
					combined.add(aboutByProfileId);
					combined.add(skillByProfileId);

					// to show a list correctly
					GenericEntity<List<Object>> entity = new GenericEntity<>(combined) {
					};

					return Response.ok(entity).build();
				}
			}

			return Response.status(Response.Status.BAD_REQUEST).entity("Profile does not exist.").build();

		}
	}

	@GET //GET at http://localhost:XXXX/users/1/profiles/1/experiences/1
	@Path("{userId}/profiles/{profileId}/experiences/{experienceId}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response GetExperience(@PathParam("userId") int userId, @PathParam("profileId") int profileId
			, @PathParam("experienceId") int experienceId) {

		List<Experience> foundExperiences = fakeDataProfile.GetExperienceByProfileId(profileId); // getting the experience by profile id

		if(foundExperiences == null){
			return Response.status(Response.Status.BAD_REQUEST).entity("Please provide a valid profile id.").build();
		}
		else {

			for (Experience e: foundExperiences){
				if(e.getId() == experienceId){
					List<Experience> experienceByProfileId = fakeDataProfile.GetExperiencesByProfileID(profileId);

					// to combine different types of lists into 1
					List<Object> combined = new ArrayList<>();
					combined.add(experienceByProfileId);

					// to show a list correctly
					GenericEntity<List<Object>> entity = new GenericEntity<>(combined) {
					};

					return Response.ok(entity).build();
				}
			}

			return Response.status(Response.Status.BAD_REQUEST).entity("Experience id does not exist.").build();

		}
	}

	@GET //GET at http://localhost:XXXX/users/1/profiles/1/educations/1
	@Path("{userId}/profiles/{profileId}/educations/{educationId}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response GetEducation(@PathParam("userId") int userId, @PathParam("profileId") int profileId
			, @PathParam("educationId") int educationId) {

		List<Education> foundEducations = fakeDataProfile.GetEducationsByProfileId(profileId); // getting the education by profile id

		if(foundEducations == null){
			return Response.status(Response.Status.BAD_REQUEST).entity("Please provide a valid profile id.").build();
		}
		else {

			for (Education e: foundEducations){
				if(e.getId() == educationId){
					List<Education> educationByProfileId = fakeDataProfile.GetEducationsByProfileId(profileId);

					// to combine different types of lists into 1
					List<Object> combined = new ArrayList<>();
					combined.add(educationByProfileId);

					// to show a list correctly
					GenericEntity<List<Object>> entity = new GenericEntity<>(combined) {
					};

					return Response.ok(entity).build();
				}
			}

			return Response.status(Response.Status.BAD_REQUEST).entity("Education id does not exist.").build();

		}
	}

	@GET //GET at http://localhost:XXXX/users/1/profiles/1/skills/1
	@Path("{userId}/profiles/{profileId}/skills/{skillId}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response GetSkill(@PathParam("userId") int userId, @PathParam("profileId") int profileId
			, @PathParam("skillId") int skillId) {

		List<Skill> foundSkills = fakeDataProfile.GetSkillsByProfileId(profileId); // getting the education by profile id

		if(foundSkills == null){
			return Response.status(Response.Status.BAD_REQUEST).entity("Please provide a valid profile id.").build();
		}
		else {

			for (Skill s: foundSkills){
				if(s.getId() == skillId){
					List<Skill> skillByProfileId = fakeDataProfile.GetSkillByProfileID(profileId);

					// to combine different types of lists into 1
					List<Object> combined = new ArrayList<>();
					combined.add(skillByProfileId);

					// to show a list correctly
					GenericEntity<List<Object>> entity = new GenericEntity<>(combined) {
					};

					return Response.ok(entity).build();
				}
			}

			return Response.status(Response.Status.BAD_REQUEST).entity("Skill id does not exist.").build();

		}
	}


	@GET //GET at http://localhost:XXXX/profile/educations
	@Path("{userId}/profiles/{profileId}/experiences")
	@Produces(MediaType.APPLICATION_JSON)
	public Response GetExperiences(@PathParam("userId") int userId, @PathParam("profileId") int profileId1) {
		List<Experience> experiences = fakeDataProfile.GetExperiencesByProfileID(profileId1);

		GenericEntity<List<Experience>> entity = new GenericEntity<>(experiences) {
		};
		return Response.ok(entity).build();
	}
//
	@GET //GET at http://localhost:XXXX/profile/educations
	@Path("{userId}/profiles/{profileId}/educations")
	@Produces(MediaType.APPLICATION_JSON)
	public Response  GetEducations(@PathParam("userId") int userId, @PathParam("profileId") int profileId1) {
		List<Education> educations = fakeDataProfile.GetEducationsByProfileId(profileId1);

		GenericEntity<List<Education>> entity = new GenericEntity<>(educations) {
		};
		return Response.ok(entity).build();
	}
	@GET //GET at http://localhost:XXXX/profile/educations
	@Path("{userId}/profiles/{profileId}/abouts")
	@Produces(MediaType.APPLICATION_JSON)
	public Response  GetAbouts(@PathParam("userId") int userId, @PathParam("profileId") int profileId1) {
		List<About> abouts = fakeDataProfile.GetAboutByProfileID(profileId1);

		GenericEntity<List<About>> entity = new GenericEntity<>(abouts) {
		};
		return Response.ok(entity).build();
	}
	@GET //GET at http://localhost:XXXX/profile/educations
	@Path("{userId}/profiles/{profileId}/skills")
	@Produces(MediaType.APPLICATION_JSON)
	public Response GetSkills(@PathParam("userId") int userId, @PathParam("profileId") int profileId1) {
		List<Skill> skills = fakeDataProfile.GetSkillByProfileID(profileId1);

		GenericEntity<List<Skill>> entity = new GenericEntity<>(skills) {
		};
		return Response.ok(entity).build();
	}

	// to add a new experience
	@POST //POST at http://localhost:XXXX/profile/experience
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("{userId}/profiles/{profileId}/experiences/new")
	public Response CreateExperience(@PathParam("userId") int userId, @PathParam("profileId") int profileId, Experience e) {

		if (!fakeDataProfile.AddExperience(e,  userId, profileId))
		{
			String entity =  "Experience Exists";
			// throw new Exception(Response.Status.CONFLICT, "This topic already exists");
			return Response.status(Response.Status.CONFLICT).entity(entity).build();
		} else {
			String url = uriInfo.getAbsolutePath() + "/" + e.getId(); //
			URI uri = URI.create(url);
			return Response.created(uri).build();
		}
	}
	// to add a new experience
	@POST //POST at http://localhost:XXXX/profile/experience
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("{userId}/profiles/{profileId}/educations/new")
	public Response CreateEducation(@PathParam("userId") int userId, @PathParam("profileId") int profileId, Education e) {

		if (!fakeDataProfile.AddEducation(e, userId, profileId))
		{
			String entity =  "Education Exists";
			// throw new Exception(Response.Status.CONFLICT, "This topic already exists");
			return Response.status(Response.Status.CONFLICT).entity(entity).build();
		} else {
			String url = uriInfo.getAbsolutePath() + "/" + e.getId(); //
			URI uri = URI.create(url);
			return Response.created(uri).build();
		}
	}

	//delete user's experince with specific id
	@DELETE //DELETE at http://localhost:9099/users/1/profiles/1/experiences/1/
	@Path("{userId}/profiles/{profileID}/experiences/{experinceID}") // userId'/profiles/profileId/experiences/experienceId
	public Response deleteUserExperience(@PathParam("userId") int userId ,@PathParam("profileID") int profileID,
										 @PathParam("experinceID") int experinceID) {
		fakeDataProfile.deleteExperience(userId, profileID, experinceID);

		return Response.noContent().build();
	}

	// DELETE 1//2/3///
	//delete user's education with specific id
	@DELETE //DELETE at http://localhost:9090/users/3/profiles/2/educations/1
	@Path("{userId}/profiles/{profileID}/educations/{educationID}")
	public Response deleteUserEducation(@PathParam("userId") int userId ,@PathParam("profileID") int profileID,
										@PathParam("educationID") int educationID) {
		fakeDataProfile.deleteEducation(userId, profileID, educationID);

		return Response.noContent().build();
	}

	//delete user's skill with specific id
	@DELETE //DELETE at http://localhost:9090/users/1/profiles/1/skills/1
	@Path("{userId}/profiles/{profileID}/skills/{skillID}")
	public Response deleteUserSkill(@PathParam("userId") int userId ,@PathParam("profileID") int profileID,
									@PathParam("skillID") int skillID) {
		fakeDataProfile.deleteSkill(userId, profileID, skillID);

		return Response.noContent().build();
	}

	// to add a new about
	@POST //POST at http://localhost:XXXX/profile/experience
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("{userId}/profiles/{profileId}/abouts/new")
	public Response CreateAbout(@PathParam("userId") int userId, @PathParam("profileId") int profileId, About a) {

		if (!fakeDataProfile.AddAbout(a,  userId, profileId))
		{
			String entity =  "About Exists";
			// throw new Exception(Response.Status.CONFLICT, "This topic already exists");
			return Response.status(Response.Status.CONFLICT).entity(entity).build();
		} else {
			String url = uriInfo.getAbsolutePath() + "/" + a.getId(); //
			URI uri = URI.create(url);
			return Response.created(uri).build();
		}
	}

	// to add a new skill
	@POST //POST at http://localhost:XXXX/profile/experience
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("{userId}/profiles/{profileId}/skills/new")
	public Response CreateAbout(@PathParam("userId") int userId, @PathParam("profileId") int profileId, Skill s) {

		if (!fakeDataProfile.AddSkill(s,  userId, profileId))
		{
			String entity =  "SKill Exists";
			// throw new Exception(Response.Status.CONFLICT, "This topic already exists");
			return Response.status(Response.Status.CONFLICT).entity(entity).build();
		} else {
			String url = uriInfo.getAbsolutePath() + "/" + s.getId(); // url of the created student
			URI uri = URI.create(url);
			return Response.created(uri).build();
		}
	}
	@PUT //PUT at http://localhost:XXXX/users/profile/about/id
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("/profile/about/{id}")
	public Response updateAbout(@PathParam("id") int id, About a) {
		// Idempotent method. Always update (even if the resource has already been updated before).
		if (fakeDataProfile.updateAbout(id, a)) {
			return Response.noContent().build();
		} else {
			return Response.status(Response.Status.NOT_FOUND).entity("Please provide a valid about.").build();
		}
	}

	@PUT //PUT at http://localhost:XXXX/users/profile/education/id
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("/profile/education/{id}")
	public Response updateEducation(@PathParam("id") int id, Education e) {
		// Idempotent method. Always update (even if the resource has already been updated before).
		if (fakeDataProfile.updateEducation(id, e)) {
			return Response.noContent().build();
		} else {
			return Response.status(Response.Status.NOT_FOUND).entity("Please provide a valid education.").build();
		}
	}
	@PUT //PUT at http://localhost:XXXX/users/profile/experience/id
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("/profile/experience/{id}")
	public Response updateExperience(@PathParam("id") int id, Experience e) {
		// Idempotent method. Always update (even if the resource has already been updated before).
		if (fakeDataProfile.updateExperience(id, e)) {
			return Response.noContent().build();
		} else {
			return Response.status(Response.Status.NOT_FOUND).entity("Please provide a valid experience.").build();
		}
	}
	@PUT //PUT at http://localhost:XXXX/profile/information
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("{userId}")
	public Response updateUser(@PathParam("userId") int id, User user) {
		// Idempotent method. Always update (even if the resource has already been updated before).
		if (fakeDataProfile.updateUser(id, user)) {
			return Response.noContent().build();
		} else {
			return Response.status(Response.Status.NOT_FOUND).entity("Please provide a valid id.").build();
		}
	}
}
