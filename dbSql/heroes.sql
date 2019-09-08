/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 50022
 Source Host           : localhost:3306
 Source Schema         : heroes

 Target Server Type    : MySQL
 Target Server Version : 50022
 File Encoding         : 65001

 Date: 08/09/2019 21:31:28
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for heroes
-- ----------------------------
DROP TABLE IF EXISTS `heroes`;
CREATE TABLE `heroes`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `nickname` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `file` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `skill` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `age` int(11) NULL DEFAULT NULL,
  `sex` enum('男','女') CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY USING BTREE (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 56 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of heroes
-- ----------------------------
INSERT INTO `heroes` VALUES (2, '蒙多', '祖安狂人', '', '扔菜刀', NULL, NULL);
INSERT INTO `heroes` VALUES (4, '盖伦', '德玛西亚之力', '', NULL, 27, '男');
INSERT INTO `heroes` VALUES (5, '菲奥娜', '无双剑姬', '', NULL, 20, '女');
INSERT INTO `heroes` VALUES (6, '亚索', '疾风剑豪', '', NULL, 33, '男');
INSERT INTO `heroes` VALUES (7, '易', '无极剑圣', '', NULL, 29, '男');
INSERT INTO `heroes` VALUES (8, '德莱文', '荣耀行刑官', '', NULL, 37, '男');
INSERT INTO `heroes` VALUES (9, '泰隆', '刀锋之影', '', NULL, 28, '男');
INSERT INTO `heroes` VALUES (10, '锐雯', '放逐之刃', '', NULL, 19, '女');
INSERT INTO `heroes` VALUES (11, '乐芙兰', '诡术妖姬', '', NULL, 46, '女');
INSERT INTO `heroes` VALUES (12, '金克丝', '暴走萝莉', NULL, NULL, 17, '女');
INSERT INTO `heroes` VALUES (13, '迦娜', '风暴之怒', NULL, NULL, 20, '女');
INSERT INTO `heroes` VALUES (14, '吉格斯', '爆破鬼才', NULL, NULL, 67, '男');
INSERT INTO `heroes` VALUES (15, '凯特琳', '皮城女警', NULL, NULL, 25, '女');
INSERT INTO `heroes` VALUES (16, '卡莉斯塔', '复仇之矛', NULL, NULL, 34, '女');
INSERT INTO `heroes` VALUES (17, '卡尔萨斯', '死亡颂唱者', NULL, NULL, 99, '男');
INSERT INTO `heroes` VALUES (18, '潘森', '战争之王', NULL, NULL, 43, '男');
INSERT INTO `heroes` VALUES (19, '拉莫斯', '披甲龙龟', NULL, NULL, 103, '女');
INSERT INTO `heroes` VALUES (20, '内瑟斯', '沙漠死神', NULL, NULL, 38, '男');
INSERT INTO `heroes` VALUES (21, '崔斯特', '卡牌大师', NULL, NULL, 57, '男');
INSERT INTO `heroes` VALUES (22, '艾希', '寒冰射手', NULL, NULL, 27, '女');
INSERT INTO `heroes` VALUES (23, '泰达米尔', '蛮族之王', NULL, NULL, 29, '男');
INSERT INTO `heroes` VALUES (24, '崔斯塔娜', '麦林炮手', NULL, NULL, 18, '女');
INSERT INTO `heroes` VALUES (25, '雷克塞', '虚空遁地兽', NULL, NULL, 40, '女');
INSERT INTO `heroes` VALUES (26, '亚托克斯', '暗裔剑魔', NULL, NULL, 57, '男');
INSERT INTO `heroes` VALUES (27, '孙悟空', '齐天大圣', NULL, '在空中转圈圈', NULL, NULL);
INSERT INTO `heroes` VALUES (28, '卡特琳娜', '不祥之刃', NULL, '转圈圈和捡圈圈', 24, '女');
INSERT INTO `heroes` VALUES (29, '希维尔', '战争女神', NULL, '扔圈圈', NULL, NULL);
INSERT INTO `heroes` VALUES (31, '提莫', '迅捷斥候', NULL, NULL, NULL, NULL);
INSERT INTO `heroes` VALUES (32, '拉克丝', '光辉女郎', NULL, '动感光波', 24, '女');
INSERT INTO `heroes` VALUES (33, '卡莎', '虚空之女', NULL, '虚化', 33, '女');
INSERT INTO `heroes` VALUES (34, '老司机', '嘀嘀嘀', NULL, NULL, NULL, NULL);
INSERT INTO `heroes` VALUES (52, '11', '88', '746c6e880b8c44675bd8c6fcc4b3c504', '8888', NULL, NULL);
INSERT INTO `heroes` VALUES (53, '小篆头111', '砖头', '317a7112f70323e8b9fea20691503512', '扔砖头33', NULL, NULL);
INSERT INTO `heroes` VALUES (54, '小砖头', '111', '614a03586aea9122bc252d77aa95f235', '杀猪', NULL, NULL);
INSERT INTO `heroes` VALUES (55, '雄安', '新区', '40aa5547374365a5aa59344fbc1b6a70', '666', NULL, NULL);

SET FOREIGN_KEY_CHECKS = 1;
