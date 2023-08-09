export const normalizeCategoryParams = (category, data) => ({
  ...category,
  placesMatrix: data.map((partner) => (partner.PartnerUnits || []).map((unit) => ({
    partnerId: unit.partnerId,
    unitId: unit.id,
  }))).flat(),
});
export const normalizeGuideParams = (data) => ({
  ...data,
  ScriptPartnerLists: undefined,
  placesMatrix: data.ScriptPartnerLists.map((place) => ({
    id: place.id,
    partnerId: place.PartnerUnit.partnerId,
    unitId: place.partnerUnitId,
    description: place.description,
  })),
});
export const normalizeMomentParams = (data) => ({
  ...data,
  MomentsPartnerLists: undefined,
  placesMatrix: data.MomentsPartnerLists.map((place) => ({
    id: place.id,
    partnerId: place.PartnerUnit.partnerId,
    unitId: place.PartnerUnit.id,
    description: place.description,
  })),
});
export const normalizeNearbyParams = (data) => ({
  placesMatrix: data.map((partner) => (partner.PartnerUnits || []).map((unit) => ({
    partnerId: unit.partnerId,
    unitId: unit.id,
  }))).flat(),
});