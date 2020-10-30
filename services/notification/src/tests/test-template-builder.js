const { describe } = require("mocha");
const { expect } = require("chai");
const { TemplateBuilder } = require("../helpers/template-builder");

describe("TemplateBuilder tests", () => {
  it("builds templates for instant email notifications", () => {
    const builder = new TemplateBuilder("https://fightpandemics.com");
    const notifications = [
      {
        _id: "5f8b9228653a234a3a62d27f",
        action: "like",
        post: { id: "5f87ab5524acbb001d812fd1", title: "Test post 1" },
        receiver: {
          _id: "5f60488a1f5b72120034d148",
          hide: { address: false },
          needs: { medicalHelp: false, otherHelp: false },
          objectives: {
            donate: false,
            shareInformation: false,
            volunteer: true,
          },
          type: "Individual",
          __t: "IndividualUser",
          firstName: "Manny",
          lastName: "Karyampudi",
          location: {
            address: "Venice Beach, Venice, FL 34285, USA",
            city: "Venice",
            coordinates: [-82.4575967, 27.1000553],
            country: "US",
            state: "FL",
            zip: "34285",
          },
          authId: "google-oauth2|108676035332759709990",
          email: "some.fake.email@gmail.com",
          createdAt: "2020-10-15T01:51:52.534Z",
          updatedAt: "2020-10-15T01:51:52.534Z",
          __v: 0,
        },
        triggeredBy: {
          id: "5f88f281c2de24001d579daa",
          name: "Test Manny org",
          type: "Startup",
        },
        createdAt: "2020-10-17T01:51:52.534Z",
        readAt: null,
        emailSentAt: null,
      },
      {
        _id: "5f8b9228655a231a3a62d27f",
        action: "like",
        post: { id: "5f87ab5524acbb002d812fd1", title: "Test post 2" },
        receiver: {
          _id: "5f60488a2f5b72420034d148",
          hide: { address: false },
          needs: { medicalHelp: false, otherHelp: false },
          notifyPrefs: {
            comment: {
              instant: true,
              daily: true,
              weekly: true,
              biweekly: true,
            },
            like: {
              instant: true,
              daily: true,
              weekly: true,
              biweekly: true,
            },
            message: {
              instant: true,
              daily: true,
              weekly: true,
              biweekly: true,
            },
            post: {
              instant: true,
              daily: true,
              weekly: true,
              biweekly: true,
            },
          },
          objectives: {
            donate: false,
            shareInformation: false,
            volunteer: true,
          },
          type: "Individual",
          __t: "IndividualUser",
          firstName: "Naruto",
          lastName: "Uzumaki",
          location: {
            address: "Konohagakure",
            city: "Konohagakure",
            coordinates: [135.0, 35.1000553],
            country: "LF",
            state: "",
            zip: "12345",
          },
          authId: "google-oauth2|108676053332759709990",
          email: "naruto@leafvillage.com",
          createdAt: "2020-10-15T01:51:52.534Z",
          updatedAt: "2020-10-15T01:51:52.534Z",
          __v: 0,
        },
        triggeredBy: {
          id: "5f88f281c2de24001d579daa",
          name: "Test Manny org",
          type: "Startup",
        },
        createdAt: "2020-10-17T01:51:52.534Z",
        readAt: null,
        emailSentAt: null,
      },
      {
        _id: "5f8b9228653a214a3b62d27f",
        action: "like",
        post: { id: "5f87ab5524acbb001d812fd1", title: "Test post 1" },
        receiver: {
          _id: "5f60488a1f5b72130044d148",
          hide: { address: false },
          needs: { medicalHelp: false, otherHelp: false },
          notifyPrefs: {
            comment: {
              instant: false,
              daily: false,
              weekly: false,
              biweekly: false,
            },
            like: {
              instant: false,
              daily: false,
              weekly: false,
              biweekly: false,
            },
            message: {
              instant: false,
              daily: false,
              weekly: false,
              biweekly: false,
            },
            post: {
              instant: false,
              daily: false,
              weekly: false,
              biweekly: false,
            },
          },
          objectives: {
            donate: false,
            shareInformation: false,
            volunteer: true,
          },
          type: "Individual",
          __t: "IndividualUser",
          firstName: "Bob",
          lastName: "Saget",
          location: {
            address: "Broderick Street, San Francisco, CA 94115, USA",
            city: "San Francisco",
            coordinates: [37.786896, -122.441778],
            country: "US",
            state: "CA",
            zip: "94115",
          },
          authId: "google-oauth2|108676090732734109990",
          email: "bob.saget@fullhouse.com",
          createdAt: "2020-10-15T01:51:52.534Z",
          updatedAt: "2020-10-15T01:51:52.534Z",
          __v: 0,
        },
        triggeredBy: {
          id: "5f88f281c2de24001d579daa",
          name: "Test Manny org",
          type: "Startup",
        },
        createdAt: "2020-10-17T01:51:52.534Z",
        readAt: null,
        emailSentAt: null,
      },
    ];
    const emails = builder.build("instant", notifications);
    expect(emails.length).to.equal(2);  // Bob Saget should be filtered out. Only Naruto and Manny.
    expect(emails[0].notificationId).to.equal("5f8b9228653a234a3a62d27f");
    expect(emails[0].toEmailAddress).to.equal("some.fake.email@gmail.com");
    expect(emails[0].subject).to.equal(
      "Test Manny org liked your post: Test post 1",
    );
    expect(emails[1].notificationId).to.equal("5f8b9228655a231a3a62d27f");
    expect(emails[1].toEmailAddress).to.equal("naruto@leafvillage.com");
    expect(emails[1].subject).to.equal(
      "Test Manny org liked your post: Test post 2",
    );
  });
});
