export const useFiltersStore = defineStore('filters', {
  state: () => ({
    period: null,
    businessTypes: null, 
    businessSizes: null, 
    sector: null,        
    region: null         
  }),
  actions: {
    setPeriod(period) {
      this.period = period
    },
    setBusinessTypes(types) {
      const all = [1, 2]
      this.businessTypes = types.length === all.length ? null : types
    },
    setBusinessSizes(sizes) {
      const all = [1, 2, 3]
      this.businessSizes = sizes.length === all.length ? null : sizes
    },
    setSector(sectorId) {
      this.sector = sectorId === 'all' ? null : sectorId
    },
    setRegion(regionId) {
      this.region = regionId === 'all' ? null : regionId
    },
    resetFilters() {
      this.period = null
      this.businessTypes = null
      this.businessSizes = null
      this.sector = null
      this.region = null
    }
  }
})
