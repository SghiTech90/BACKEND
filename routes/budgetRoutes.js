const express = require("express");
const router = express.Router();
const {
  getBudgetCount,
  getUpvibhagCounts,
  getUniqueYears,
  getUniqueHeadNames,
  getBudgetSummaryByYear,
  getBudgetDetailsByYearAndHead,

  BudgetMaster2515,
  BudgetMasterNABARD,
  BudgetMasterMP,
  BudgetMasterMLA,
  BudgetMasterGAT_FBC,
  BudgetMasterGAT_D,
  BudgetMasterGAT_A,
  BudgetMasterDPDC,
  BudgetMasterDepositFund,
  BudgetMasterCRF,
  BudgetMasterBuilding,
  BudgetMasterAunty,
  BudgetMasterRoad,

  Cont2515,
  ContAnnuity,
  ContBuilding,
  ContNABARD,
  ContSHDOR,
  ContCRF,
  ContMLA,
  ContMP,
  ContDPDC,
  ContGAT_A,
  ContGAT_FBC,
  ContDepositFund,
  ContGAT_D,
  ContResidentialBuilding2216,
  ContNonResidentialBuilding2909,

  contractorGraph,

  ContractorBuildingReportApi,
  ContractorCRFReportApi,
  ContractorNabardReportApi,
  ContractorRoadReportApi,
  ContractorDPDCReportApi,
  ContractorAnnuityReportApi,

  ContractorBuildingUpdatePanelApi,
  ContractorCRFUpdatePanelApi,
  ContractorNABARDUpdatePanelApi,
  ContractorRoadUpdatePanelApi,
  ContractorAuntyUpdatePanelApi,

  DEBuildingUpdatePanelApi,
  DECRFUpdatePanelApi,
  DENABARDUpdatePanelApi,
  DERoadUpdatePanelApi,
  DEAuntyUpdatePanelApi,

  ContUpdPanelBuilding,
  ContUpdPanelCrf,
  ContUpdPanelNABARD,
  ContUpdPanelROAD,
  ContUpdPanelAunty,
  ContUpdPanel2515,
  ContUpdPanelDeposite_fund,
  ContUpdPanelDPDC,
  ContUpdPanelGAT_A,
  ContUpdPanelGAT_D,
  ContUpdPanelGAT_FBC,
  ContUpdPanelMLA,
  ContUpdPanelMP,
  ContUpdPanelNonResBui,
  ContUpdPanelResBui,

  ContUpdPhotoAunty,
  ContUpdPhotoRoad,
  ContUpdPhotoCrf,
  ContUpdPhotoNabard,
  ContUpdPhotoBuilding,
  ContUpdPhoto2515,
  ContUpdPhotoDeposite_fund,
  ContUpdPhotoDPDC,
  ContUpdPhotoGAT_A,
  ContUpdPhotoGAT_D,
  ContUpdPhotoGAT_FBC,
  ContUpdPhotoMLA,
  ContUpdPhotoMP,
  ContUpdPhotoNonResBui,
  ContUpdPhotoResBui,

  ShowImage,
  uploadImage,

  UpdateStatusBuilding,
  UpdateStatusAunty,
  UpdateStatusRoad,
  UpdateStatusNabard,
  UpdateStatusCrf,
  UpdateStatus2515,
  UpdateStatusDepositeFund,
  UpdateStatusDPDC,
  UpdateStatusGatA,
  UpdateStatusGatB,
  UpdateStatusGatFBC,
  UpdateStatusMLA,
  UpdateStatusMP,
  UpdateStatusNRB,
  UpdateStatusRB,

  EEUpdPanelAunty,
  EEUpdPanelROAD,
  EEUpdPanelCrf,
  EEUpdPanelNABARD,
  EEUpdPanelBuilding,
    EEUpdPanel2515,
  EEUpdPanelDepositeFund,
  EEUpdPanelDPDC,
  EEUpdPanelGatA,
  EEUpdPanelGatD,
  EEUpdPanelGatFBC,
  EEUpdPanelMLA,
  EEUpdPanelMP,
  EEUpdPanelRB,
  EEUpdPanelNRB,

  allImage,

  CircleChartCount,
  CirclePieChartCount,

  CircleNotificationToday,
  CircleNotificationWeek,
  CircleNotificationHalfMonth,
  CircleNotificationMonth,
  CircleNotificationBtnToday,
  CircleNotificationBtnWeek,
  CircleNotificationBtnHalfMonth,
  CircleNotificationBtnMonth,
  getCircleNotificationTotal,

  getBuilding,
  getResidentialBuilding,
  getNonResidentialBuilding,
  getCRF,
  getDepositFund,
  getDPDC,
  getAunty,
  getRoad,
  getNABARD,
  getGATA,
  getGATFBC,
  getGATD,
  getMLA,
  get2515,
} = require("../controllers/budgetController");

// Route to get budget count
router.post("/count", getBudgetCount);
router.post("/contractorGraph", contractorGraph);

// Route to get Upvibhag counts from all budget tables
router.post("/upvibhag-counts", getUpvibhagCounts);

// Route to get unique years from provision tables
router.post("/unique-years", getUniqueYears); // Requires office

// Route to get unique head names from master tables
router.post("/unique-head-names", getUniqueHeadNames); // Requires office

// Route to get budget summary by year
router.post("/summary-by-year", getBudgetSummaryByYear); // Requires office, year

// Route to get budget details by year and head name
router.post("/details-by-year-head", getBudgetDetailsByYearAndHead); 

//Executive engineer
router.post("/BudgetMaster2515", BudgetMaster2515); 
router.post("/BudgetMasterNABARD", BudgetMasterNABARD); 
router.post("/BudgetMasterMP", BudgetMasterMP); 
router.post("/BudgetMasterMLA", BudgetMasterMLA); 
router.post("/BudgetMasterGAT_FBC", BudgetMasterGAT_FBC); 
router.post("/BudgetMasterGAT_D", BudgetMasterGAT_D); 
router.post("/BudgetMasterGAT_A", BudgetMasterGAT_A); 
router.post("/BudgetMasterDPDC", BudgetMasterDPDC); 
router.post("/BudgetMasterDepositFund", BudgetMasterDepositFund); 
router.post("/BudgetMasterCRF", BudgetMasterCRF); 
router.post("/BudgetMasterBuilding", BudgetMasterBuilding); 
router.post("/BudgetMasterAunty", BudgetMasterAunty); 
router.post("/BudgetMasterRoad", BudgetMasterRoad); 


//contractor post for abstract report
router.post("/Cont2515", Cont2515);
router.post("/ContAnnuity", ContAnnuity);
router.post("/ContBuilding", ContBuilding);
router.post("/ContNABARD", ContNABARD);
router.post("/ContSHDOR", ContSHDOR);
router.post("/ContCRF", ContCRF);
router.post("/ContMLA", ContMLA);
router.post("/ContMP", ContMP);
router.post("/ContDPDC", ContDPDC);
router.post("/ContGAT_A", ContGAT_A);
router.post("/ContGAT_FBC", ContGAT_FBC);
router.post("/ContDepositFund", ContDepositFund);
router.post("/ContGAT_D", ContGAT_D);
router.post("/ContResidentialBuilding2216", ContResidentialBuilding2216);
router.post("/ContNonResidentialBuilding2909", ContNonResidentialBuilding2909);

//contractor report page
router.post("/ContractorBuildingReportApi", ContractorBuildingReportApi);
router.post("/ContractorCRFReportApi", ContractorCRFReportApi); 
router.post("/ContractorNabardReportApi", ContractorNabardReportApi);
router.post("/ContractorRoadReportApi", ContractorRoadReportApi);
router.post("/ContractorDPDCReportApi", ContractorDPDCReportApi);
router.post("/ContractorAnnuityReportApi", ContractorAnnuityReportApi);

//contractor update report page
//बी.टी. देशमुख (contractor)
router.post("/ContractorBuildingUpdatePanelApi", ContractorBuildingUpdatePanelApi);
router.post("/ContractorCRFUpdatePanelApi", ContractorCRFUpdatePanelApi);
router.post("/ContractorNABARDUpdatePanelApi", ContractorNABARDUpdatePanelApi);
router.post("/ContractorRoadUpdatePanelApi", ContractorRoadUpdatePanelApi);
router.post("/ContractorAuntyUpdatePanelApi", ContractorAuntyUpdatePanelApi);
//श्री. आर.एल राठोड (DE) 
router.post("/DEBuildingUpdatePanelApi", DEBuildingUpdatePanelApi);
router.post("/DECRFUpdatePanelApi", DECRFUpdatePanelApi);
router.post("/DENABARDUpdatePanelApi", DENABARDUpdatePanelApi);
router.post("/DERoadUpdatePanelApi", DERoadUpdatePanelApi);
router.post("/DEAuntyUpdatePanelApi", DEAuntyUpdatePanelApi);

//Contractor Update Panel Select Queries
//--Contractor = मे.ए.एम.कोठारी // ShakhaAbhyantaName= श्री. पी एम घोडस्कर //  UpabhyantaName = श्री. पी एम घोडस्कर
router.post("/ContUpdPanelBuilding", ContUpdPanelBuilding);
router.post("/ContUpdPanelNABARD", ContUpdPanelNABARD);
router.post("/ContUpdPanelCRF", ContUpdPanelCrf);
router.post("/ContUpdPanelROAD", ContUpdPanelROAD);
router.post("/ContUpdPanelAunty", ContUpdPanelAunty);
router.post("/ContUpdPanel2515", ContUpdPanel2515);
router.post("/ContUpdPanelDeposite_fund", ContUpdPanelDeposite_fund);
router.post("/ContUpdPanelDPDC", ContUpdPanelDPDC);
router.post("/ContUpdPanelGAT_A", ContUpdPanelGAT_A);
router.post("/ContUpdPanelGAT_D", ContUpdPanelGAT_D);
router.post("/ContUpdPanelGAT_FBC", ContUpdPanelGAT_FBC);
router.post("/ContUpdPanelMLA", ContUpdPanelMLA);
router.post("/ContUpdPanelMP", ContUpdPanelMP);
router.post("/ContUpdPanelNonResBui", ContUpdPanelNonResBui);
router.post("/ContUpdPanelResBui", ContUpdPanelResBui);

//EE Update Panel Select Queries
//--EE = मे.ए.एम.कोठारी // ShakhaAbhyantaName= श्री. पी एम घोडस्कर //  UpabhyantaName = श्री. पी एम घोडस्कर
router.post("/EEUpdPanelBuilding", EEUpdPanelBuilding);
router.post("/EEUpdPanelNABARD", EEUpdPanelNABARD);
router.post("/EEUpdPanelCRF", EEUpdPanelCrf);
router.post("/EEUpdPanelROAD", EEUpdPanelROAD);
router.post("/EEUpdPanelAunty", EEUpdPanelAunty);
router.post("/EEUpdPanel2515", EEUpdPanel2515);
router.post("/EEUpdPanelDepositeFund", EEUpdPanelDepositeFund);
router.post("/EEUpdPanelDPDC", EEUpdPanelDPDC);
router.post("/EEUpdPanelGatA", EEUpdPanelGatA);
router.post("/EEUpdPanelGatD", EEUpdPanelGatD);
router.post("/EEUpdPanelGatFBC", EEUpdPanelGatFBC);
router.post("/EEUpdPanelMLA", EEUpdPanelMLA);
router.post("/EEUpdPanelMP", EEUpdPanelMP);
router.post("/EEUpdPanelRB", EEUpdPanelRB);
router.post("/EEUpdPanelNRB", EEUpdPanelNRB);

//--Contractor -- upload photo -- click photo in the grid --queries for that
router.post("/ContUpdPhotoBuilding", ContUpdPhotoBuilding);
router.post("/ContUpdPhotoNABARD", ContUpdPhotoNabard);
router.post("/ContUpdPhotoCRF", ContUpdPhotoCrf);
router.post("/ContUpdPhotoROAD", ContUpdPhotoRoad);
router.post("/ContUpdPhotoAunty", ContUpdPhotoAunty);
router.post("/ContUpdPhoto2515", ContUpdPhoto2515);
router.post("/ContUpdPhotoDeposite_fund", ContUpdPhotoDeposite_fund);
router.post("/ContUpdPhotoDPDC", ContUpdPhotoDPDC);
router.post("/ContUpdPhotoGAT_A", ContUpdPhotoGAT_A);
router.post("/ContUpdPhotoGAT_D", ContUpdPhotoGAT_D);
router.post("/ContUpdPhotoGAT_FBC", ContUpdPhotoGAT_FBC);
router.post("/ContUpdPhotoMLA", ContUpdPhotoMLA);
router.post("/ContUpdPhotoMP", ContUpdPhotoMP);
router.post("/ContUpdPhotoNonResBui", ContUpdPhotoNonResBui);
router.post("/ContUpdPhotoResBui", ContUpdPhotoResBui);

//Insert Image
router.post("/uploadImage", uploadImage);
router.post("/allImage", allImage);
router.post("/ShowImage", ShowImage);

//update status in correspondance to workID
router.post("/UpdateStatusBuilding", UpdateStatusBuilding);
router.post("/UpdateStatusAunty", UpdateStatusAunty);
router.post("/UpdateStatusRoad", UpdateStatusRoad);
router.post("/UpdateStatusNabard", UpdateStatusNabard);
router.post("/UpdateStatusCrf", UpdateStatusCrf);
router.post("/UpdateStatus2515", UpdateStatus2515);
router.post("/UpdateStatusDepositeFund", UpdateStatusDepositeFund);
router.post("/UpdateStatusDPDC", UpdateStatusDPDC);
router.post("/UpdateStatusGatA", UpdateStatusGatA);
router.post("/UpdateStatusGatB", UpdateStatusGatB);
router.post("/UpdateStatusGatFBC", UpdateStatusGatFBC);
router.post("/UpdateStatusMLA", UpdateStatusMLA);
router.post("/UpdateStatusMP", UpdateStatusMP);
router.post("/UpdateStatusNRB", UpdateStatusNRB);
router.post("/UpdateStatusRB", UpdateStatusRB);

//Circle
router.post("/CircleChartCount", CircleChartCount);
router.post("/CirclePieChartCount", CirclePieChartCount);
router.post("/CircleNotificationToday", CircleNotificationToday);
router.post("/CircleNotificationWeek", CircleNotificationWeek);
router.post("/CircleNotificationHalfMonth", CircleNotificationHalfMonth);
router.post("/CircleNotificationMonth", CircleNotificationMonth);
router.post("/CircleNotificationBtnToday", CircleNotificationBtnToday);
router.post("/CircleNotificationBtnWeek", CircleNotificationBtnWeek);
router.post("/CircleNotificationBtnHalfMonth", CircleNotificationBtnHalfMonth);
router.post("/CircleNotificationBtnMonth", CircleNotificationBtnMonth);
router.post("/CircleTotalNotificationCount", getCircleNotificationTotal);


router.post("/CirclegetBuilding", getBuilding);
router.post("/CirclegetResidentialBuilding", getResidentialBuilding);
router.post("/CirclegetNonResidentialBuilding", getNonResidentialBuilding);
router.post("/CirclegetCRF", getCRF);
router.post("/CirclegetDepositFund", getDepositFund);
router.post("/CirclegetDPDC", getDPDC);
router.post("/CirclegetAunty", getAunty);
router.post("/CirclegetRoad", getRoad);
router.post("/CirclegetNABARD", getNABARD);
router.post("/CirclegetGATA", getGATA);
router.post("/CirclegetGATFBC", getGATFBC);
router.post("/CirclegetGATD", getGATD);
router.post("/CirclegetMLA", getMLA);
router.post("/Circleget2515", get2515);

module.exports = router;

