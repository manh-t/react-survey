import { Resource } from 'types/resource';
import { Survey } from 'types/survey';

import { Deserializable, deserialize, deserializeList } from './deserializer';

describe('Deserializer helper', () => {
  interface TestType extends Resource {
    name: string;
    age: number;
  }

  describe('deserialize', () => {
    const jsonData = {
      id: '1',
      type: 'TestType',
      attributes: {
        name: 'Name',
        age: 25,
      },
    };

    it('returns deserialized data', () => {
      const deserializedData = deserialize<TestType>(jsonData);

      expect(deserializedData.resourceType).toBe('TestType');
      expect(deserializedData.name).toBe('Name');
      expect(deserializedData.age).toBe(25);
    });

    describe('given relationships and included', () => {
      describe('given the relationships is an array', () => {
        const jsonDataWithRelation: Deserializable = {
          type: 'survey',
          id: '234234',
          attributes: {
            title: 'Scarlett Bangkok',
            description: "We'd love ot hear from you!",
            thankEmailAboveThreshold:
              '<span style="font-family:arial,helvetica,sans-serif"><span style="font-size:14px">Dear {name},<br /><br />Thank you for visiting Scarlett Wine Bar &amp; Restaurant at Pullman Bangkok Hotel G &nbsp;and for taking the time to complete our guest feedback survey!<br /><br />Your feedback is very important to us and each survey is read individually by the management and owners shortly after it is sent. We discuss comments and suggestions at our daily meetings and use them to constantly improve our services.<br /><br />We would very much appreciate it if you could take a few more moments and review us on TripAdvisor regarding your recent visit. By <a href="https://www.tripadvisor.com/Restaurant_Review-g293916-d2629404-Reviews-Scarlett_Wine_Bar_Restaurant-Bangkok.html">clicking here</a> you will be directed to our page.&nbsp;<br /><br />Thank you once again and we look forward to seeing you soon!<br /><br />The Team at Scarlett Wine Bar &amp; Restaurant&nbsp;</span></span><span style="font-family:arial,helvetica,sans-serif; font-size:14px">Pullman Bangkok Hotel G</span>',
            thankEmailBelowThreshold:
              '<span style="font-size:14px"><span style="font-family:arial,helvetica,sans-serif">Dear {name},<br /><br />Thank you for visiting&nbsp;</span></span><span style="font-family:arial,helvetica,sans-serif; font-size:14px">Uno Mas at Centara Central World&nbsp;</span><span style="font-size:14px"><span style="font-family:arial,helvetica,sans-serif">&nbsp;and for taking the time to complete our customer&nbsp;feedback survey.</span></span><br /><br /><span style="font-family:arial,helvetica,sans-serif; font-size:14px">The Team at&nbsp;</span><span style="font-family:arial,helvetica,sans-serif"><span style="font-size:14px">Scarlett Wine Bar &amp; Restaurant&nbsp;</span></span><span style="font-family:arial,helvetica,sans-serif; font-size:14px">Pullman Bangkok Hotel G</span>',
            isActive: true,
            coverImageUrl: 'https://dhdbhh0jsld0o.cloudfront.net/m/1ea51560991bcb7d00d0_',
            createdAt: '2017-01-23T07:48:12.991Z',
            activeAt: '2015-10-08T07:04:00.000Z',
          },
          relationships: {
            questions: {
              data: [{ type: 'question', id: 'question 1' }],
            },
          },
        };

        const jsonDataIncluded: Deserializable[] = [
          {
            type: 'question',
            id: 'question 1',
            attributes: {
              text: '\nThank you for visiting Scarlett!\n Please take a moment to share your feedback.',

              displayOrder: 0,
              shortText: 'introduction',
              pick: 'none',
              displayType: 'intro',
              isMandatory: false,
              imageUrl: 'https://dhdbhh0jsld0o.cloudfront.net/m/2001ebbfdcbf6c00c757_',
              coverImageUrl: 'https://dhdbhh0jsld0o.cloudfront.net/m/1ea51560991bcb7d00d0_',
              coverImageOpacity: 0.6,
              isShareableOnFacebook: false,
              isShareableOnTwitter: false,
              tagList: '',
            },
          },
        ];

        it('sets the relation array correctly', () => {
          const deserializedData = deserialize<Survey>(jsonDataWithRelation, jsonDataIncluded);

          expect(deserializedData.resourceType).toBe('survey');
          expect(deserializedData.id).toEqual(jsonDataWithRelation.id);
          expect(deserializedData.title).toEqual(jsonDataWithRelation.attributes.title);
          expect(deserializedData.description).toEqual(jsonDataWithRelation.attributes.description);
          expect(deserializedData.thankEmailAboveThreshold).toEqual(jsonDataWithRelation.attributes.thankEmailAboveThreshold);
          expect(deserializedData.thankEmailBelowThreshold).toEqual(jsonDataWithRelation.attributes.thankEmailBelowThreshold);
          expect(deserializedData.isActive).toEqual(jsonDataWithRelation.attributes.isActive);
          expect(deserializedData.coverImageUrl).toEqual(jsonDataWithRelation.attributes.coverImageUrl);
          expect(deserializedData.createdAt).toEqual(jsonDataWithRelation.attributes.createdAt);
          expect(deserializedData.activeAt).toEqual(jsonDataWithRelation.attributes.activeAt);

          expect(deserializedData.questions?.length).toEqual(jsonDataIncluded.length);
          expect(deserializedData.questions?.at(0)?.id).toEqual(jsonDataIncluded.at(0)?.id);
        });
      });

      describe('given relationships data but NO included data', () => {
        const jsonDataWithRelation: Deserializable = {
          type: 'survey',
          id: '234234',
          attributes: {
            title: 'Scarlett Bangkok',
            description: "We'd love ot hear from you!",
            thankEmailAboveThreshold:
              '<span style="font-family:arial,helvetica,sans-serif"><span style="font-size:14px">Dear {name},<br /><br />Thank you for visiting Scarlett Wine Bar &amp; Restaurant at Pullman Bangkok Hotel G &nbsp;and for taking the time to complete our guest feedback survey!<br /><br />Your feedback is very important to us and each survey is read individually by the management and owners shortly after it is sent. We discuss comments and suggestions at our daily meetings and use them to constantly improve our services.<br /><br />We would very much appreciate it if you could take a few more moments and review us on TripAdvisor regarding your recent visit. By <a href="https://www.tripadvisor.com/Restaurant_Review-g293916-d2629404-Reviews-Scarlett_Wine_Bar_Restaurant-Bangkok.html">clicking here</a> you will be directed to our page.&nbsp;<br /><br />Thank you once again and we look forward to seeing you soon!<br /><br />The Team at Scarlett Wine Bar &amp; Restaurant&nbsp;</span></span><span style="font-family:arial,helvetica,sans-serif; font-size:14px">Pullman Bangkok Hotel G</span>',
            thankEmailBelowThreshold:
              '<span style="font-size:14px"><span style="font-family:arial,helvetica,sans-serif">Dear {name},<br /><br />Thank you for visiting&nbsp;</span></span><span style="font-family:arial,helvetica,sans-serif; font-size:14px">Uno Mas at Centara Central World&nbsp;</span><span style="font-size:14px"><span style="font-family:arial,helvetica,sans-serif">&nbsp;and for taking the time to complete our customer&nbsp;feedback survey.</span></span><br /><br /><span style="font-family:arial,helvetica,sans-serif; font-size:14px">The Team at&nbsp;</span><span style="font-family:arial,helvetica,sans-serif"><span style="font-size:14px">Scarlett Wine Bar &amp; Restaurant&nbsp;</span></span><span style="font-family:arial,helvetica,sans-serif; font-size:14px">Pullman Bangkok Hotel G</span>',
            isActive: true,
            coverImageUrl: 'https://dhdbhh0jsld0o.cloudfront.net/m/1ea51560991bcb7d00d0_',
            createdAt: '2017-01-23T07:48:12.991Z',
            activeAt: '2015-10-08T07:04:00.000Z',
          },
          relationships: {
            questions: {
              data: [{ type: 'question', id: 'question 1' }],
            },
          },
        };

        it('does NOT assign the relation', () => {
          const deserializedData = deserialize<Survey>(jsonDataWithRelation);

          expect(deserializedData.resourceType).toBe('survey');
          expect(deserializedData.id).toEqual(jsonDataWithRelation.id);
          expect(deserializedData.title).toEqual(jsonDataWithRelation.attributes.title);
          expect(deserializedData.description).toEqual(jsonDataWithRelation.attributes.description);
          expect(deserializedData.thankEmailAboveThreshold).toEqual(jsonDataWithRelation.attributes.thankEmailAboveThreshold);
          expect(deserializedData.thankEmailBelowThreshold).toEqual(jsonDataWithRelation.attributes.thankEmailBelowThreshold);
          expect(deserializedData.isActive).toEqual(jsonDataWithRelation.attributes.isActive);
          expect(deserializedData.coverImageUrl).toEqual(jsonDataWithRelation.attributes.coverImageUrl);
          expect(deserializedData.createdAt).toEqual(jsonDataWithRelation.attributes.createdAt);
          expect(deserializedData.activeAt).toEqual(jsonDataWithRelation.attributes.activeAt);

          expect(deserializedData.questions).toBeUndefined();
        });
      });

      describe('given NO relationships data but included data', () => {
        const jsonDataWithRelation: Deserializable = {
          type: 'survey',
          id: '234234',
          attributes: {
            title: 'Scarlett Bangkok',
            description: "We'd love ot hear from you!",
            thankEmailAboveThreshold:
              '<span style="font-family:arial,helvetica,sans-serif"><span style="font-size:14px">Dear {name},<br /><br />Thank you for visiting Scarlett Wine Bar &amp; Restaurant at Pullman Bangkok Hotel G &nbsp;and for taking the time to complete our guest feedback survey!<br /><br />Your feedback is very important to us and each survey is read individually by the management and owners shortly after it is sent. We discuss comments and suggestions at our daily meetings and use them to constantly improve our services.<br /><br />We would very much appreciate it if you could take a few more moments and review us on TripAdvisor regarding your recent visit. By <a href="https://www.tripadvisor.com/Restaurant_Review-g293916-d2629404-Reviews-Scarlett_Wine_Bar_Restaurant-Bangkok.html">clicking here</a> you will be directed to our page.&nbsp;<br /><br />Thank you once again and we look forward to seeing you soon!<br /><br />The Team at Scarlett Wine Bar &amp; Restaurant&nbsp;</span></span><span style="font-family:arial,helvetica,sans-serif; font-size:14px">Pullman Bangkok Hotel G</span>',
            thankEmailBelowThreshold:
              '<span style="font-size:14px"><span style="font-family:arial,helvetica,sans-serif">Dear {name},<br /><br />Thank you for visiting&nbsp;</span></span><span style="font-family:arial,helvetica,sans-serif; font-size:14px">Uno Mas at Centara Central World&nbsp;</span><span style="font-size:14px"><span style="font-family:arial,helvetica,sans-serif">&nbsp;and for taking the time to complete our customer&nbsp;feedback survey.</span></span><br /><br /><span style="font-family:arial,helvetica,sans-serif; font-size:14px">The Team at&nbsp;</span><span style="font-family:arial,helvetica,sans-serif"><span style="font-size:14px">Scarlett Wine Bar &amp; Restaurant&nbsp;</span></span><span style="font-family:arial,helvetica,sans-serif; font-size:14px">Pullman Bangkok Hotel G</span>',
            isActive: true,
            coverImageUrl: 'https://dhdbhh0jsld0o.cloudfront.net/m/1ea51560991bcb7d00d0_',
            createdAt: '2017-01-23T07:48:12.991Z',
            activeAt: '2015-10-08T07:04:00.000Z',
          },
        };

        const jsonDataIncluded: Deserializable[] = [
          {
            type: 'question',
            id: 'question 1',
            attributes: {
              text: '\nThank you for visiting Scarlett!\n Please take a moment to share your feedback.',

              displayOrder: 0,
              shortText: 'introduction',
              pick: 'none',
              displayType: 'intro',
              isMandatory: false,
              imageUrl: 'https://dhdbhh0jsld0o.cloudfront.net/m/2001ebbfdcbf6c00c757_',
              coverImageUrl: 'https://dhdbhh0jsld0o.cloudfront.net/m/1ea51560991bcb7d00d0_',
              coverImageOpacity: 0.6,
              isShareableOnFacebook: false,
              isShareableOnTwitter: false,
              tagList: '',
            },
          },
        ];

        it('does NOT assign the relation', () => {
          const deserializedData = deserialize<Survey>(jsonDataWithRelation, jsonDataIncluded);

          expect(deserializedData.resourceType).toBe('survey');
          expect(deserializedData.id).toEqual(jsonDataWithRelation.id);
          expect(deserializedData.title).toEqual(jsonDataWithRelation.attributes.title);
          expect(deserializedData.description).toEqual(jsonDataWithRelation.attributes.description);
          expect(deserializedData.thankEmailAboveThreshold).toEqual(jsonDataWithRelation.attributes.thankEmailAboveThreshold);
          expect(deserializedData.thankEmailBelowThreshold).toEqual(jsonDataWithRelation.attributes.thankEmailBelowThreshold);
          expect(deserializedData.isActive).toEqual(jsonDataWithRelation.attributes.isActive);
          expect(deserializedData.coverImageUrl).toEqual(jsonDataWithRelation.attributes.coverImageUrl);
          expect(deserializedData.createdAt).toEqual(jsonDataWithRelation.attributes.createdAt);
          expect(deserializedData.activeAt).toEqual(jsonDataWithRelation.attributes.activeAt);

          expect(deserializedData.questions).toBeUndefined();
        });
      });
    });

    describe('deserializeList', () => {
      const jsonArray = [
        {
          id: '1',
          type: 'TestType',
          attributes: {
            name: 'Name',
            age: 25,
          },
        },
        {
          id: '2',
          type: 'TestType',
          attributes: {
            name: 'Name',
            age: 30,
          },
        },
      ];

      it('returns a list of the deserialized items', () => {
        const deserializedList = deserializeList<TestType>(jsonArray);

        expect(deserializedList).toHaveLength(jsonArray.length);

        deserializedList.forEach((item: TestType, index: number) => {
          expect(item.resourceType).toBe('TestType');
          expect(item.name).toEqual(jsonArray[index].attributes.name);
          expect(item.age).toEqual(jsonArray[index].attributes.age);
        });
      });
    });
  });
});
