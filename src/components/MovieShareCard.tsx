import React, { forwardRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageSourcePropType,
} from "react-native";
import { colors, customFonts } from "../GlobalConsts";
import { horizontalScale, verticalScale } from "../utils/ScalingUtil";

interface MovieShareCardProps {
  title: string;
  tagline: string;
  rating: number;
  imageSource: ImageSourcePropType;
  year: string | null;
}

const MovieShareCard = forwardRef<View, MovieShareCardProps>(
  ({ title, tagline, rating, imageSource, year }, ref) => {
    return (
      <View
        ref={ref}
        collapsable={false} // Crucial for Android capture
        style={styles.cardContainer}
      >
        {/* Header: Title & Year */}
        <View style={styles.header}>
          <Text style={styles.title}>{title}</Text>
          {year && <Text style={styles.year}>{year}</Text>}
        </View>

        {/* Big Poster Image */}
        <Image source={imageSource} style={styles.poster} resizeMode="cover" />

        {/* Footer: Rating & Tagline */}
        <View style={styles.footer}>
          <View style={styles.ratingRow}>
            <Text style={styles.ratingLabel}>Rating:</Text>
            <Text style={styles.ratingValue}>{rating.toFixed(1)}/10</Text>
          </View>

          {tagline ? <Text style={styles.tagline}>"{tagline}"</Text> : null}

          <Text style={styles.appBranding}>Shared via GET MOVIES INFO</Text>
        </View>
      </View>
    );
  }
);

export default MovieShareCard;

const styles = StyleSheet.create({
  cardContainer: {
    width: horizontalScale(300),
    backgroundColor: colors.white, // White bg looks cleaner in generic shares
    borderRadius: 12,
    padding: horizontalScale(15),
    alignItems: "center",
  },
  header: {
    width: "100%",
    marginBottom: verticalScale(10),
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
    paddingBottom: verticalScale(5),
  },
  title: {
    fontFamily: customFonts.latoBlack,
    fontSize: horizontalScale(20),
    color: colors.rust,
    textAlign: "center",
  },
  year: {
    fontFamily: customFonts.lato,
    fontSize: horizontalScale(10),
    color: colors.deepGray,
    textAlign: "center",
    marginTop: verticalScale(5),
  },
  poster: {
    width: "100%",
    height: verticalScale(350),
    borderRadius: 8,
    marginBottom: verticalScale(10),
  },
  footer: {
    width: "100%",
    alignItems: "center",
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: verticalScale(5),
  },
  ratingLabel: {
    fontSize: horizontalScale(15),
    color: colors.deepGray,
    marginRight: horizontalScale(5),
  },
  ratingValue: {
    fontSize: horizontalScale(15),
    fontWeight: "bold",
    color: colors.rust,
  },
  tagline: {
    fontStyle: "italic",
    color: colors.deepGray,
    textAlign: "center",
    marginBottom: verticalScale(8),
    fontSize: horizontalScale(12),
  },
  appBranding: {
    fontSize: horizontalScale(10),
    color: colors.gray,
    marginTop: verticalScale(8),
  },
});
